const express = require('express');

const UserController = require('../Controllers/UserController');

const userRoutes = express.Router();


userRoutes.get('/api/users', UserController.index);
userRoutes.post('/api/user/register', UserController.create);
userRoutes.post('/api/user/login', UserController.login);
userRoutes.put('/api/users', UserController.update);
userRoutes.delete('/api/users', UserController.delete);


module.exports = userRoutes;