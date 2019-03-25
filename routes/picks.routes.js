const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const picksController = require('../controllers/cards.controller');

router.get('/users/:id/picks', secure.isAuthenticated, picksController.list);
router.post('/users/:id/picks', secure.isAuthenticated, picksController.create);
router.get('/users/:id/picks/:id', secure.isAuthenticated, picksController.get);


module.exports = router;