const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userResource = require('../user.resource.js');

const loginUser = require('./loginUser.js');
const User = require('../user.model.js');

const logging = require('../../../logger');

const saltRounds = parseInt(process.env.SALT_ROUNDS);


async function register(req, res){
    const data = req.body;

    const username = data.username;
    const password = data.password;
    const fullName = data.fullName;
    const email = data.email;
    const phone = data.phone;

    let passwordHash;
    try {
        passwordHash = await bcrypt.hash(password, saltRounds);
    } catch (err) {
        logging.errorLog(err);
        return res.status(400).json({ status: 400, message: "Error while creating user" });
    }


    if (!passwordHash){
        logging.errorLog("Error while creating user");
        return res.status(400).json({status: 400, message: "Error while creating user"});
    }


    console.log("New User: " + JSON.stringify(data));

    const newUser = new User({
        username: username,
        passwordHash: passwordHash,
        fullName: fullName,
        email: email,
        phone: phone,
        isActive: true
    });

    await newUser.save()
        .then(() => {
            return res.status(200).json({status: 200, message: "User created."});
        })
        .catch((err) => {

            //check if username or email already exists
            if (err.code === 11000) {
                return res.status(400).json({ status: 400, message: "Username or email already exists." });
            }

            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while creating user."})
        });
}


async function login(req, res){
    const data = req.body;

    console.log("Login: " + JSON.stringify(data));

    const username = data.username;
    const password = data.password;

    if (!username || !password){
        res.status(400).json({status: 400, message: "Username or password missing"});
        return;
    }

    const user = await User.findOne({username: username})
        .then((user)=>{
            if (!user){
                return res.status(400).json({status: 400, message: "Username or password incorrect"});
            }

            bcrypt.compare(password, user.passwordHash, (err, result) => {
                if (err){
                    logging.errorLog(err);
                    return res.status(400).json({status: 400, message: "Error while logging in"});
                }

                if (result){
                    return loginUser(user, res);
                } else {
                    return res.status(400).json({status: 400, message: "Username or password incorrect"});
                }
            });
        })
        .catch((err)=>{
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while logging in"});
        });

};

async function logout(req, res){
    res.clearCookie('authToken');
    return res.status(200).json({status: 200, message: "Logged out"});
}





module.exports = {
    register,
    login,
    logout

};
