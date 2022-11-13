const express = require('express');
const router = express.Router();
const Things = require('../models/thing-model.js');

router.get('/', async (req, res) => {
  const theThings = await Things.find({});
  console.log(`${theThings.length} things returned. 📬`);
  res.json({ things: theThings})
})

router.post('/', async (req, res) => {
  const something = await Things.create(req.body);
  console.log(`something: ${JSON.stringify(something)}`);
  res.json({ something: something});
});

module.exports = router;
