const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userRoutes = require('../modules/users/user.routes.js');
const authenticateUser = require('../modules/users/middleware/authenticateUser.js');

const userApi = require('../modules/users/services/user.api.routes.js');

const logger = require('../logger');


//Api routes
router.use(userApi);

//Admin routes
router.use('/users', userRoutes);




router.get('/', (req, res) => {
    res.send('Hello World!');
});


router.get('/test', async (req, res)=>{
    res.status(200).json({status: 200, message: "Success"});
});


router.get('/resetDB', authenticateUser, (req, res)=>{
    mongoose.connection.db.dropDatabase();
    res.status(200).json({status: 200, message: "Success"});
});

module.exports = router;