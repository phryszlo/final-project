const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  thing: {type: String, required: true},
  place: {type: String, required: false},
  quantity: {type: Number, required: true, default: 0},
})

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;