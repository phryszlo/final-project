const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = Schema({
  building: {
    type: String,
    required: [true, "region is a required field"],
    enum: ["Central","East Tower", "West Tower"]
  },
  room: {
    type: String,
    required: [true, "location name is a required field"]
  },
  location_type: {
    type: String,
    // required: [true, "location type is a required field"]
    required: false,
  }
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })

const Location = mongoose.model('Location', locationSchema);

module.exports = Location; 