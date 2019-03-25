const mongoose = require('mongoose');
import constants from '../constants'

const pickSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  stock: {
    type: String,
    required: 'Stock is required',
    uppercase: true,
    enum: constants.stocks
  },
  action: {
    type: String,
    required: 'symbol is required',
    enum: constants.actions
  },
  predictedClosing: {
    type: String,
    required: 'Predicted closing value is required',
  },
  recommendation: {
    type: String,
    required: 'Recommended action is required',
    enum: constants.recommendation
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  description: {
    type: String,
    required: 'Description is required',
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  
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

const Pick = mongoose.model('Pick', pickSchema);
module.exports = Pick;