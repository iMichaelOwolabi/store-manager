import express from 'express';

import usersController from '../../controller/users';

const router = express.Router();

const { getUsers, getOneUser, postUser, updateUser, deleteUser } = usersController;

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

export default(router);
