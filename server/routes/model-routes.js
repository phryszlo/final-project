const express = require('express');
const router = express.Router();
const Models = require('../models/model-model.js');

router.get('/', async (req, res) => {
  try {
    const theModels = await Models.find({});
    console.log(`${theModels.length} model returned. 📬`);
    res.json({ models: theModels })
  } catch (error) {
    console.log(`models get all error: ${error}`);
  }
})

router.post('/', async (req, res) => {
  try {
    const something = await Models.create(req.body);
    console.log(`something: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`models post error: ${error}`);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const something = await Models.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    console.log(`something updated: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`models patch error: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const something = await Models.findByIdAndRemove(
      req.params.id
    );
    console.log(`something deleted: ${JSON.stringify(something)}`);
    res.json({ something: something });
  } catch (error) {
    console.log(`models delete error: ${error}`);
  }
});

module.exports = router;
