const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    // required: 'Symbol is required',
  },
  open: {
    type: Number,
    // required: 'Opening value is required',
  },
  close: {
    type: Number,
    // required: 'Closing value is required',
  },
  high: {
    type: Number,
    // required: 'Highest value is required',
  },
  low: {
    type: Number,
    // required: 'Lowest value is required',
  },
  volume: {
    type: Number,
    // required: 'Volume is required',
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});


const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;