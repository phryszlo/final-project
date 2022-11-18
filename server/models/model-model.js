const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = Schema({
  eq_type: {
    type: String,
    required: [true, "eq_type is a required field"],
  },
  make: {
    type: String,
    required: [true, "make is a required field"]
  },
  model_name: {
    type: String,
    required: false,
  },
  model_number: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })

const Model = mongoose.model('Model', modelSchema);

module.exports = Model; 