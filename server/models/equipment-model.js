const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = Schema({
  serial_number: {
    type: String,
    required: [true, "serial_number is a required field"],
  },
  model_id: {
    type: Schema.Types.ObjectId,
    ref: "Model"
  },
  location_id: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  }
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment; 