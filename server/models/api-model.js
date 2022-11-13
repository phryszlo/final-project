const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiSchema = Schema({
  name: {
    type: String,
    required: [true, "name is a required field"],
    unique: true
  },
  url: {
    type: String,
    required: [true, "url is a required field"]
  },
  api_key: {
    type: String,
    required: false
  }
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })

const Api = mongoose.model('Api', apiSchema);

module.exports = Api;