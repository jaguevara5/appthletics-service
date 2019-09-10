const express = require('express');
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/users');
const router = express.Router();

router.get('', checkAuth, UsersController.getUsers);

router.post('/new', checkAuth, UsersController.createUser);

router.post('/delete', checkAuth, UsersController.deleteUsers);

router.put('/:id', checkAuth, UsersController.updateUser);

module.exports = router;