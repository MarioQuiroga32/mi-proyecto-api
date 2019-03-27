const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');


router.get('/', secure.isAuthenticated, usersController.list);
router.post('/', secure.isAuthenticated,  usersController.create);
router.get('/:userId', secure.isAuthenticated, usersController.get);
router.put('/:userId', secure.isAuthenticated, usersController.update);


module.exports = router;