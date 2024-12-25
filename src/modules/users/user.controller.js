const User = require('./user.model');
const logging = require('../../logger');

const userResource = require('./user.resource');
const userTable = require('./user.table');
const userForm = require('./user.form');

async function getUsers(req, res) {
    await User.find()
        .then((users) => {
            let formattedUsers = users.map((user) => {
                return userResource(user);
            });
            return res.status(200).json({status: 200, users: formattedUsers});
        })
        .catch((err) => {
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while finding users."});
        });
}

async function createUser(req, res) {

    const username = req.body.username;
    const passwordHash = req.body.password || req.body.username; // This is not secure, but I will fix it later, for now password is same as username
    const email = req.body.email;
    const phone = req.body.phone;


    //get required fields from model
    const requiredFields = Object.entries(User.schema.paths)
        //filter out non-required fields and passwordHash
        .filter(([key, value]) => value.isRequired)
        .map(([key, value]) => key);

    //check if all required fields are present
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ status: 400, message: `${field} is required.` });
        }
    }


    const newUser = new User({
        username, email, phone, passwordHash
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

async function getUserByID(req, res) {
    await User.findById(req.params.id)
        .then((user) => {
            return res.status(200).json({status: 200, user: userResource.formatData(user)});
        })
        .catch((err) => {
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while finding user."})
        });
}

async function getUserByUsername(req, res) {
    await User.findOne({username: req.body.username})
        .then((user) => {
            return res.status(200).json({status: 200, user: userResource.formatData(user)});
        })
        .catch((err) => {
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while finding user."})
        });
}

async function updateUser(req, res) {
    let id = req.params.id;
    let data = req.body;

    let user = await User.findById(id);
    if (user == null){
        res.status(400).json({status: 400, message: "User not found"});
    }

    user.username = data.username || user.username;
    user.email = data.email || user.email;
    user.phone = data.phone || user.phone;

    await user.save()
        .then(()=>{
            return res.status(200).json({status: 200, message: "User updated."});
        }).catch((err)=>{
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while updating user."});
        });
}

async function deleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({status: 200, message: "User deleted."})
        })
        .catch((err) => {
            logging.errorLog(err);
            res.status(400).json({status: 400, message: "Error while deleting user."})
        });
}

async function getUsersTable(req, res) {

    //Pagination
    let pagination = req.query.pagination || 10;
    let page = req.query.page || 1;
    let pages = 0;

    //Get total number of pages
    await User.countDocuments({}).then((count)=>{
        pages = Math.ceil(count / pagination);
    });


    await User.find({})
        .skip((page - 1) * pagination)
        .limit(pagination)
        .then((users)=>{
            let paginationInfo = {
                page: page,
                pagination: pagination,
                pages: pages
            };

            let formattedUsers = users.map((user) => {
                return userTable.resource(user);
            });

            return res.status(200).json({status: 200, tableData: formattedUsers, columns: userTable.columns, paginationInfo: paginationInfo});
        })
        .catch((err)=>{
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while finding users."});
        });
}

async function getUsersForm(req, res){
    let id = req.params.id;

    if (id == null){
        return res.status(200).json({status: 200, message: "Success", fields: userForm.fields});
    }

    await User.findById(id)
        .then((user)=>{
            return res.status(200).json({status: 200, message: "Success", fields: userForm.fields, formData: userForm.resource(user)});
        }).catch((err)=>{
            logging.errorLog(err);
            return res.status(400).json({status: 400, message: "Error while finding user."});
        });
}

module.exports = {
    getUsers,
    createUser,
    getUserByID,
    getUserByUsername,
    updateUser,
    deleteUser,
    getUsersTable,
    getUsersForm
};
