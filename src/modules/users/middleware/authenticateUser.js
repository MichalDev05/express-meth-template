const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();

const logging = require('../../../logger');
const req = require('express/lib/request.js');

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret){
    console.log("JWT_SECRET not found in .env file");
    process.exit();
}

function authenticateUser(req, res, next) {
    let token;
    try {
        token = req.cookies.authToken;
    } catch (err){
        return res.sendStatus(401);
    }

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, async (err, jwtUser) => {
        if (err) return res.sendStatus(403);
        const username = jwtUser.username;

        const user = await User.findOne({username: username})
            .catch((err) => {
                logging.errorLog(err);
                return res.sendStatus(403);
            });

        if (!user) return res.sendStatus(403);

        req.username = username;
        req.user = user;
        req.userID = user._id;
        next();
    });
}

module.exports = authenticateUser;