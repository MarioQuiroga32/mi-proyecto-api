const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.list);
router.post('/', usersController.create);
router.get('/:userId', usersController.get);
router.put('/:userId', usersController.update);


module.exports = router;