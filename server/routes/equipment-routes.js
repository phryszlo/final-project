const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment-model.js');
const Models = require('../models/model-model.js');
const Locations = require('../models/location-model');

router.get('/', async (req, res) => {
  try {
    const theEquipment = await Equipment.find({});
    console.log(`${theEquipment.length} equipment returned. 📬`);
    res.json({ equipment: theEquipment })
  } catch (error) {
    console.log(`equipment get all error: ${error}`);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const theEquipment = await Equipment.findById({ _id: req.params.id }, "-__v -createdAt -updatedAt")
      .populate('model_id')
      .populate('location_id');
    console.log(`${theEquipment.length} equipment returned. 📬`);
    res.json({ equipment: theEquipment })
  } catch (error) {
    console.log(`equipment get one error: ${error}`);
  }
})

router.post('/', async (req, res) => {
  try {
    const something = await Equipment.create(req.body);
    console.log(`something: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`equipment post error: ${error}`);
  }
});

router.post('/xl-import', async (req, res) => {
  try {
    console.log(`body: ${JSON.stringify(req.body)}`);
    // const result = await Equipment.insertMany(req.body.body)

    const arr = req.body.body;
    let result;
    arr.forEach(async (item) => {
      console.log(`item: ${JSON.stringify(item)}`);
      result = await Locations.find({ "building": item.building, "room": item.room })
        .select("_id");
      console.log(`::the id is:: ${JSON.stringify(result[0].id)}`);

      let {building, room, ...newEq} = item;
      newEq.location_id = result[0].id;
      console.log(`newEq: ${JSON.stringify(newEq)}`);
      result = await Equipment.create(newEq);
      console.log(`the result was: ${JSON.stringify(result)}`);
    })

    console.log(`result: ${JSON.stringify(result)}`);
    res.json({ result: "eq inserts maybe worked. no errors thrown." });
  } catch (error) {
    console.log(`equipment post error: ${error}`);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const something = await Equipment.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    console.log(`something updated: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`equipment patch error: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const something = await Equipment.findByIdAndRemove(
      req.params.id
    );
    console.log(`something deleted: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`equipment delete error: ${error}`);
  }
});

module.exports = router;
