const express = require('express');
const router = express.Router();
const Smurfs = require('../models/smurf-model.js');

router.get('/', async (req, res) => {
  const theSmurfs = await Smurfs.find({});
  console.log(`${theSmurfs.length} smurfs returned. 🥶`);
  res.json({ smurfs: theSmurfs})
})

router.post('/', async (req, res) => {
  const something = await Smurfs.create(req.body);
  console.log(`something: ${JSON.stringify(something)}`);
  res.json({ something: something});
})

module.exports = router;