const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smurfSchema = Schema({
  name: { type: String, required: true },
  pants_color: {
    type: String,
    enum: ['white', 'red', 'yellow', 'none']
  },
},
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  })


const Smurf = mongoose.model('Smurf', smurfSchema);

module.exports = Smurf;