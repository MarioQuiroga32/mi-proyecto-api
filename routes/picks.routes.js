const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const picksController = require('../controllers/picks.controller');

router.post('/', picksController.createPick);
router.get('/', picksController.listPicks);
router.get('/following', picksController.listFollowingPicks);
router.get('/:id', picksController.getPick);

module.exports = router;