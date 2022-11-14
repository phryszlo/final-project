const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = Schema({
  serial_number: {
    type: String,
    // required: [true, "serial_number is a required field"],
    required: false,
  },
  id_tag: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Active","Inactive","Out of service", "Lost", "In use", "Dan took it"],
  },
  notes: {
    type: String,
    required: false,
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