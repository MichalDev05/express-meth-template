const User = require('../user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret){
    console.log("JWT_SECRET not found in .env file");
    process.exit();
}

function loginUser(user, res){

    const token = jwt.sign({id: user.id, username: user.username}, jwtSecret);

    res.cookie('authToken', token);
    res.status(200).json({status: 200, message: "User logged in.", token: token});
}

module.exports = loginUser;