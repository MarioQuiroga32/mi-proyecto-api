const Pick = require('../models/pick.model');

const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Pick.find()
    .then(picks => res.json(picks))
    .catch(next);
}

module.exports.get = (req, res, next) => {
  Pick.findById(req.params.id)
    .then(pick => {
      if (!pick) {
        throw createError(404, 'pick not found');
      } else {
        res.json(pick);
      }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
  Pick.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(pick => {
      if (!pick) {
        throw createError(404, 'pick not found');
      } else {
        res.json(pick);
      }
    })
    .catch(next);
}

module.exports.create = (req, res, next) => {
  const pick = new Pick(req.body);

  console.log(req.file);
  if (req.file) {
    pick.imageURL = req.file.secure_url;
  }

  pick.save()
    .then(pick => res.status(201).json(pick))
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  Pick.findByIdAndDelete(req.params.id)
    .then(pick => {
      if (!pick) {
        throw createError(404, 'pick not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(next);
}