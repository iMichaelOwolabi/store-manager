import express from 'express';

import UsersController from '../controller/users';

const router = express.Router();

// Getting all users on the server
router.get('/api/v1/users', UsersController.getUsers);

// Getting a specific user with the id property
router.get('/api/v1/users/:id', UsersController.getOneUser);

// Creating a new user
router.post('/api/v1/users', UsersController.postUser);

// Updating a user information
router.put('/api/v1/users/:id', UsersController.updateUser);

// Delete a user account
router.delete('/api/v1/users/:id', UsersController.deleteUser);

export default router;
