const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = Schema({
  type: {
    type: String,
    required: [true, "type is a required field"],
    unique: true
  },
  make: {
    type: String,
    required: [true, "make is a required field"]
  },
  model_number: {
    type: String,
    required: [true, "model# is a required field"]
  }
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })

const Model = mongoose.model('Model', modelSchema);

module.exports = Model; 