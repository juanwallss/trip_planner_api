const express = require('express');
const loginController = require('../controllers/loginController')
require('dotenv').config();

const router = express.Router();

router.post('/signup', loginController.signup);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;
