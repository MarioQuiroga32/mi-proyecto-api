const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const picksController = require('../controllers/picks.contoller');

router.get('/', picksController.list);
router.post('/', picksController.create);
router.get('/:id', picksController.get);


module.exports = router;