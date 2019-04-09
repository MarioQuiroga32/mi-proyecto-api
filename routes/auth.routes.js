const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authController = require('../controllers/auth.controller');
const uploader = require('../configs/storage.config');

router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);
router.post('/logout', authController.logout);


router.put('/profile', secure.isAuthenticated, authController.editProfile);

module.exports = router;