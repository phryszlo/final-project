const express = require('express');
const deepartController = require("../controllers/deepartController");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const DIR = path.join(__dirname, '../../public/');
const fetch = require('isomorphic-fetch');
const axios = require('axios');
const fs = require('fs').promises;

const stylesUrl = "https://api.deeparteffects.com/v1/noauth/styles";
const uploadUrl = "https://api.deeparteffects.com/v1/noauth/upload";
const submissionUrl = "https://api.deeparteffects.com/v1/noauth/result?submissionId=";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    }
    else {
      cb(null, false);
      return cb(new Error('only .png, .jpg, and .jpeg are allowed'));
    }
  }
})


router.post('/', upload.single('srcImg'), async (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    const filePath = path.join(__dirname, '../../public/', req.file.filename);
    const fileData = await fs.readFile(filePath, { encoding: 'base64' });
    fs.writeFile(path.join(__dirname, '../../public/out.txt'), fileData)
    // console.log(`fileDAta=${fileData}`);

    const data = {
      "styleId": "c7985759-1560-11e7-afe2-06d95fe194ed", // req.body.styleId,
      "imageBase64Encoded": fileData
    }
    const result = await axios.post(uploadUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "UrpHTqSLVY2ikmUxpK1yU4H10ppiFbWg59uHhuRk" // process.env.DEEPART_API_KEY,
      }
    })

    // WAIT time SECONDs
    async function delay(time) {
      await new Promise(resolve => setTimeout(resolve, time));
    }

    console.log(`result = ${JSON.stringify(result.data.submissionId)}`);
    // return result.data.submissionId;


    var resultUrl = '';
    var finished = false;

    setTimeout(() => {
      finished = true
    }, 30000)

    while (resultUrl === '' && !finished) {
      await delay(1500);
      const altered = await axios.get(submissionUrl + result.data.submissionId, {
        headers: {
          // "x-api-key": "UrpHTqSLVY2ikmUxpK1yU4H10ppiFbWg59uHhuRk" // process.env.DEEPART_API_KEY,
          "x-api-key": process.env.DEEPART_API_KEY
        }
      });

      const url = await altered.data.url;
      console.log(`altered data.url = ${url}`);

      resultUrl = url ? url : '';
      resultUrl !== '' && (finished = true);

    }

    console.log(resultUrl)
    res.send(resultUrl);

  } catch (error) {
    console.error(`post error: ${error}`)
  }
})



module.exports = router;
