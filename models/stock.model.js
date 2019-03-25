const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true,
    uppercase: true
  },
  symbol: {
    type: String,
    required: 'Symbol is required',
  },
  openingValue: {
    type: String,
    required: 'Opening value is required',
  },
  closingValue: {
    type: String,
    required: 'Closing value is required',
  },
  highestValue: {
    type: String,
    required: 'Highest value is required',
  },
  lowestValue: {
    type: String,
    required: 'Lowest value is required',
  },
  volume: {
    type: String,
    required: 'Volume is required',
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