import express from 'express';

import { getUsers, getOneUser, postUser, updateUser, deleteUser } from '../../../controller/users/index';

const router = express.Router();

// Getting all users on the server
router.get('/', getUsers);

// Getting a specific user with the id property
router.get('/:id', getOneUser);

// Creating a new user
router.post('/', postUser);

// Updating a user information
router.put('/:id', updateUser);

// Delete a user account
router.delete('/:id', deleteUser);

export default router;
