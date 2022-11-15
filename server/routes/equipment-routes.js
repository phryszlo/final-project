const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment-model.js');
const Models = require('../models/model-model.js');
const Locations = require('../models/location-model');
const { default: mongoose } = require('mongoose');

// get all eq
router.get('/', async (req, res) => {
  try {
    const theEquipment = await Equipment.find({});
    console.log(`${theEquipment.length} equipment returned. 📬`);
    res.json({ equipment: theEquipment })
  } catch (error) {
    console.log(`equipment get all error: ${error}`);
  }
})

router.get('/join', async (req, res) => {
  try {
    const theEquipment = await Equipment.find({})
      .populate({ path: 'location_id', select: ['building', 'room'] })
      .populate({ path: 'model_id', select: ['eq_type', 'make', 'model_name'] });
    console.log(`${theEquipment.length} equipment returned. 📬`);
    res.json({ equipment: theEquipment })
  } catch (error) {
    console.log(`equipment get all error: ${error}`);
  }
})
// get one eq by id
router.get('/:id', async (req, res) => {
  try {
    console.log(`eqid = ${req.params.id}`);
    const theEquipment = await Equipment.findById({ _id: mongoose.Types.ObjectId(req.params.id) }, "-__v -createdAt -updatedAt")
      .populate('model_id')
      .populate('location_id');
    console.log(`the equipment: ${JSON.stringify(theEquipment)}📬`);
    return res.json(theEquipment)
  } catch (error) {
    console.log(`equipment get one error: ${error}`);
  }
})

// post one eq
router.post('/', async (req, res) => {
  try {
    console.log(`post route: ${JSON.stringify(req.params.id)} ... ${JSON.stringify(req.body)}`);

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
    let loc, model, result;

    // iterate the eq arr. query models for matching building + room
    // then query locations for matching eq_type, make and model_name
    // and save those ids in eq collection. (is there a single populate method to handle this?)
    arr.forEach(async (item) => {
      console.log(`item: ${JSON.stringify(item)}`);

      // find matches for location and save the id as location_id in eq coll.
      loc = await Locations.find({ "building": item.building, "room": item.room })
        .select("_id");
      console.log(`::the id is:: ${JSON.stringify(loc[0].id)}`);
      let { building, room, ...newEq } = item;
      newEq.location_id = loc[0].id;

      console.log(`item.eq_type: ${item.eq_type}`);
      console.log(`item.make: ${item.make}`);
      console.log(`item.model_name: ${item.model_name}`);

      // find matches for model and save the id as model_id in eq coll.
      model = await Models.find({ "eq_type": item.eq_type, "make": item.make, "model_name": item.model_name })
        .select("_id");

      let eq = {};
      if (model[0] && model[0].id) {
        console.log(`::model id:: ${JSON.stringify(model[0].id)}`);
        console.log(`newEq before destruct: ${JSON.stringify(newEq)}`);

        let { eq_type, make, model_name, ...newerEq } = newEq;
        newerEq.model_id = model[0].id;
        console.log(`newerEq: ${JSON.stringify(newerEq)}`);
        eq = newerEq;
      }

      // eq should now contain only the eq model fields, plus location_id and model_id
      console.log(`eq???: ${JSON.stringify(eq)}`);


      result = await Equipment.create(eq);
      // console.log(`the result was: ${JSON.stringify(result)}`);
    })

    console.log(`result: ${JSON.stringify(result)}`);
    res.json({ result: "eq inserts maybe worked. no errors thrown." });
  } catch (error) {
    console.log(`equipment post error: ${error}`);
  }
});

// update one eq
router.patch('/:id', async (req, res) => {
  try {
    console.log(`id ==== ${JSON.stringify(req.params.id)}`)
    console.log(`patch route: ${JSON.stringify(req.params.id)} ... ${JSON.stringify(req.body)}`);
    const something = await Equipment.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id), req.body, { new: true }
    );
    console.log(`something updated: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`equipment patch error: ${error}`);
  }
});

// delete one eq
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
