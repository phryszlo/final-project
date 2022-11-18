const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Locations = require('../models/location-model.js');

router.get('/', async (req, res) => {
  try {
    const theLocations = await Locations.find({});
    console.log(`${theLocations.length} locations returned. 📬`);
    res.json({ locations: theLocations })
  } catch (error) {
    console.log(`locations get all error: ${error}`);
  }
})

// get one location by id
router.get('/:id', async (req, res) => {
  try {
    console.log(`locit = ${req.params.id}`);
    const theLocation = await Locations.findById({ _id: mongoose.Types.ObjectId(req.params.id) }, "-__v -createdAt -updatedAt");
    console.log(`the location: ${JSON.stringify(theLocation)}📬`);
    return res.json(theLocation)
  } catch (error) {
    console.log(`location get one error: ${error}`);
  }
})

router.post('/', async (req, res) => {
  try {
    const something = await Locations.create(req.body);
    console.log(`something: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`locations post error: ${error}`);
  }
});

router.post('/xl-import', async (req, res) => {
  try {
    console.log(`body: ${JSON.stringify(req.body)}`);
    const result = await Locations.insertMany(req.body.body)
    console.log(`result: ${JSON.stringify(result)}`);
    res.json({ result: result });
  } catch (error) {
    console.log(`locations post error: ${error}`);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const something = await Locations.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    console.log(`something updated: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`locations patch error: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const something = await Locations.findByIdAndRemove(
      req.params.id
    );
    console.log(`something deleted: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`locations delete error: ${error}`);
  }
});

module.exports = router;
