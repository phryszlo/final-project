const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment-model.js');
const Models = require('../models/model-model.js');

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
    const theEquipment = await Equipment.findById({_id: req.params.id}, "-__v -createdAt -updatedAt")
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
    const result = await Equipment.insertMany(req.body.body)
    console.log(`result: ${JSON.stringify(result)}`);
    res.json({ result: result });
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
