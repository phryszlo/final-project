const express = require('express');
const router = express.Router();
const Apis = require('../models/api-model.js');

router.get('/', async (req, res) => {
  const theApis = await Apis.find({});
  console.log(`${theApis.length} apis returned. 📬`);
  res.json({ apis: theApis})
})

router.post('/', async (req, res) => {
  const something = await Apis.create(req.body);
  console.log(`something: ${JSON.stringify(something)}`);
  res.json({ something: something});
});

module.exports = router;
