const User = require('../models/user.model');

const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw createError(404, 'user not found');
      } else {
        res.json(user);
      }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        throw createError(404, 'user not found');
      } else {
        res.json(user);
      }
    })
    .catch(next);
}

module.exports.create = (req, res, next) => {
  const user = new User(req.body);

  console.log(req.file);
  if (req.file) {
    user.imageURL = req.file.secure_url;
  }

  user.save()
    .then(user => res.status(201).json(user))
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        throw createError(404, 'user not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(next);
}