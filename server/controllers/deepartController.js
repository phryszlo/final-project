require('dotenv').config();
const cors = require('cors');
const fetch = require('isomorphic-fetch');

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

let sid = "";
const stylesUrl = "https://api.deeparteffects.com/v1/noauth/styles";
const uploadUrl = "https://api.deeparteffects.com/v1/noauth/upload";
const resultUrl = `https://api.deeparteffects.com/v1/noauth/result?submissionId=${sid}`;

exports.getStyles = async (req, res) => {
  try {
    const styles = await fetch(stylesUrl, {
      headers: {
        "content-type": "application/json",
        "x-api-key": "UrpHTqSLVY2ikmUxpK1yU4H10ppiFbWg59uHhuRk" // process.env.DEEPART_API_KEY,
      },
    })
    const json = await styles.json();
    // console.log(`json: ${JSON.stringify(json)}`)

    res.json(json)

  } catch (error) {
    console.log(`getStyles error: ${error}`)
  }
}

// body on req: styleId, image
exports.postImage = async (req, res) => {
  try {
    console.log(`anything at all`)
    // return;
    console.log(`req.body exists? : ${req.body ? true : false}`);
    // return;
    console.log(`req.body = ${JSON.stringify(req.body)}`);
    const parsee = JSON.parse(req.body.image);
    console.log(`${parsee}`);
    Object.entries(parsee).forEach((k,v) => {
      console.log(`k=${k} v=${v}`)
    })
    console.log(`req.body.image = ${JSON.parse(req.body.image)}`);
    // return
    const base64Data = new Buffer.from(JSON.stringify(req.body.image))//.replace(/^data:image\/\w+;base64,/, ""), 'base64') : '';
    // console.log(`base64data= ${base64Data}`);
    return;
    const result = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "x-api-key": "UrpHTqSLVY2ikmUxpK1yU4H10ppiFbWg59uHhuRk" // process.env.DEEPART_API_KEY,
      },
      body: {
        "styleId": req.body.styleId,
        "imageBase64Encoded": base64Data
        // const base64Data = new Buffer.from(req.body.base64data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      }
    });
    const json = await result.json();
    console.log(`json: ${JSON.stringify(json)}`);
  } catch (error) {
    console.log(`postImage error: ${error}`);
  }
}

// module.exports = getStyles;


// // Define a route handler for creating users
// exports.createUser = async (request, response) => {
//   try {
//     // Create new user
//     const newUser = await User.create({
//       name: request.body.name,
//       email: request.body.email,
//       password: request.body.password,
//     });

//     // Remove password from output
//     newUser.password = undefined;

//     // Create token
//     const token = await jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: process.env.JWT_EXPIRATION_DATE,
//       }
//     );

//     // Send JSON RESPONSE
//     response.status(201).json({
//       status: "success",
//       data: {
//         newUser,
//         token,
//       },
//     });
//   } catch (error) {
//     response.status(500).json({
//       status: "error",
//       error: error,
//     });
//   }
// };


/*
const passwordEnteredByUser = "mypass123"
const hash = "$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K"

bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
})
*/




// // IMPORT JSON WEBTOKEN TO ASSIST WITH TOKEN
// const jwt = require("jsonwebtoken");

// // IMPORT USER TO MANIPULATE DATA ON THE DATABASE LEVEL
// const User = require("../../models/userModel");

// exports.getUsers = async (req, res) => {
//   res.send('get / got')
// }

// // Define a route handler for creating users
// exports.createUser = async (request, response) => {
//   try {
//     console.log(`controller createUser`)
//     // console.log(`createUser: ${request.body.name}`);
//     // Create new user
//     const newUser = await User.create({
//       name: request.body.name,
//       email: request.body.email,
//       password: request.body.password,
//     });

//     console.log(`User.create passed`);

//     // Remove password from output
//     newUser.password = undefined;

//     // Create token
//     const token = await jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: process.env.JWT_EXPIRATION_DATE,
//       }
//     );

//     // Send JSON RESPONSE
//     response.status(201).json({
//       status: "success",
//       data: {
//         newUser,
//         token,
//       },
//     });
//   } catch (error) {
//     console.log(`error: ${error}`)
//     response.status(500).json({
//       status: "error",
//       error: error,
//     });
//   }
// };

// // Define a route handler for retrieving the a single user
// exports.getUser = async (request, response) => {
//   try {
//     const user = await User.findById(request.params.id);

//     // Assuming no user if found with that id
//     if (!user) {
//       throw new Error("No user found with that id");
//     }

//     // Send response
//     response.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     response.status(404).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };





// // const User = require('../models/user')
// // const jwt = require('jsonwebtoken')

// // async function create(req, res) {

// //   try {
// //     const user = await User.create(req.body);
// //     const token = createJWT(user);
// //     res.json(token);
// //   } catch (err) {
// //     res.status(400).json(err);
// //   }
// // }

// // async function login(req, res) {
// //   try {
// //     const user = await User.findOne({email: req.body.email});
// //     console.log(`user: ${JSON.stringify(user)}`);
// //     if (user === null) return res.status(401).json({unauthorized: true})
// //     const token = createJWT(user);
// //     res.json(token);
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // }

// // function createJWT(user) {
// //   return jwt.sign(
// //     // data payload
// //     { user },
// //     process.env.ACCESS_TOKEN_SECRET,
// //     { expiresIn: '24h' }
// //   );
// // }

// // function checkToken(req, res) {
// //   // req.user will always be there for you when a token is sent
// //   console.log('req.user', req.user);
// //   res.json(req.exp);
// // }

// // module.exports = {
// //   create,
// //   login,
// //   createJWT,
// //   checkToken
// // };