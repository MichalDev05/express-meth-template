const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authenticateUser.js');
const registerChecks = require('../middleware/registerChecks.js');

const userApiController = require('./user.api.controller.js');



router.post('/register', registerChecks, userApiController.register);
router.post('/login', userApiController.login);

router.get('/logout', authenticateUser, userApiController.logout);



module.exports = router;