import express from 'express';

import {
  getUsers,
  getOneUser,
  postUser,
  updateUser,
  deleteUser,
} from '../controller/users/index';

const router = express.Router();

// Getting all users on the server
router.get('/api/v1/users', getUsers);

// Getting a specific user with the id property
router.get('/api/v1/users/:id', getOneUser);

// Creating a new user
router.post('/api/v1/users', postUser);

// Updating a user information
router.put('/api/v1/users/:id', updateUser);

// Delete a user account
router.delete('/api/v1/users/:id', deleteUser);

export default router;
