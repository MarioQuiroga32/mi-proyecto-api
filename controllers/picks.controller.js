const mongoose = require('mongoose')
const createError = require('http-errors');
const Pick = require('../models/pick.model')

module.exports.createPick = (req, res, next) => {
  const pick = new Pick(req.body)
  pick.save()
    .then(pick => res.status(201).json(pick))
    .catch(next);
}

module.exports.listPicks = (req, res, next) => {
  const search = {}

  if (req.query.users) {
    search.user = { $in: req.query.users.split(',') }
  }

  Pick.find(search)
    .then(picks => res.json(picks))
    .catch(next);
}

module.exports.listFollowingPicks = (req, res, next) => {
  const search = {
    user: { $in: req.user.following }
  }

  Pick.find(search)
    .then(picks => res.json(picks))
    .catch(next);
}


module.exports.getPick = (req, res, next) => {
  Pick.findById(req.params.pickId)
    .then(pick => {
      if (!pick) {
        throw createError(404, 'pick not found');
      } else {
        res.json(pick);
      }
    })
    .catch(next);
}