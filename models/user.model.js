const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../constants");
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, "Invalid email pattern"]
    },
    password: {
      type: String,
      required: "Password is required",
      match: [
        PASSWORD_PATTERN,
        "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers."
      ]
    },
    portfolio: {
      type: String,
      required: "At least 1 stock is required",
      enum: [constants.stocks]
    },

    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],

    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],

    picks: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
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
            type: mongoose.Schema.Types.ObjectId,
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
    }],
    average: {
      type: Number
    },

    avatarURL: {
      type: String,
      match: [URL_PATTERN, "Invalid avatar URL pattern"]
    }
  },
  {
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
  }
);

// userSchema.virtual('picks', {
//   ref: Pick.modelName,
//   localField: '_id',
//   foreignField: 'user',
//   options: {  }
// })

userSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  } else {
    bcrypt
      .genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt).then(hash => {
          user.password = hash;
          next();
        });
      })
      .catch(next);
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;