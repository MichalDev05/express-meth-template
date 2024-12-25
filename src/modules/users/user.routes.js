const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

//Get table and form for admin
router.get('/table', userController.getUsersTable);
router.get('/form', userController.getUsersForm);
router.get('/form/:id', userController.getUsersForm);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserByID);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;