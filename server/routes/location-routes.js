const express = require('express');
const router = express.Router();
const Locations = require('../models/location-model.js');

router.get('/', async (req, res) => {
  try {
    const theEquipment = await Locations.find({});
    console.log(`${theEquipment.length} locations returned. 📬`);
    res.json({ locations: theEquipment })
  } catch (error) {
    console.log(`locations get all error: ${error}`);
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
