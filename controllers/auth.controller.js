const User = require('../models/user.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        throw createError(409, 'Email already registered')
      } else {
        return new User(req.body).save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(401, message));
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next);
}

module.exports.editProfile = (req, res, next) => {
  delete req.body.email;
  
  const user = req.user;
  Object.keys(req.body).forEach(prop => user[prop] = req.body[prop]);
  if (req.file) user.avatarUrl = req.file.secure_url;
  
  user.save()
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}