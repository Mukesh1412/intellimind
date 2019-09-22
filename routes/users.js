const express = require('express');
const router = express.Router()
const userController = require("../controller/userController");
// router.get('/users');
router.post('/users', userController.addUser);
router.get('/users/:user_id', userController.getUserById);
router.get('/users', userController.getAllUsers);
module.exports = router;