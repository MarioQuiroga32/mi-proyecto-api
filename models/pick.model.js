const mongoose = require('mongoose');
const constants = require('../constants')

const pickSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String
  },
  stock: {
    type: String
  },
  date: {
    type: String
  },
  action: {
    type: String,
    // required: 'action is required'
  },
  recommendation: {
    type: String,
    // required: 'Recommended action is required',
    enum: constants.recommendation
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  description: {
    type: String,
    // required: 'Description is required',
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
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
      }
      // date: {
      //   type: Date,
      //   default: Date.now
      // }
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

// pickSchema.index();


const Pick = mongoose.model('Pick', pickSchema);
module.exports = Pick;