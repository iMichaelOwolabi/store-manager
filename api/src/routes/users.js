import dotenv from 'dotenv';
import express from 'express';
import UsersController from '../controller/users';
import Auth from '../utility/auth';

dotenv.config();

const router = express.Router();

// Getting all users on the server
router.get('/api/v1/users', Auth.verifyToken, Auth.isAdmin, UsersController.getUsers);

// Getting a specific user with the id property
router.get('/api/v1/users/:id', Auth.verifyToken, Auth.isAdmin, UsersController.getOneUser);

// Creating a new user
router.post('/api/v1/auth/signup', Auth.verifyToken, Auth.isAdmin, UsersController.postUser);

router.post('/api/v1/auth/login', UsersController.login);

// Updating a user information
router.put('/api/v1/users/:id', Auth.verifyToken, Auth.isAdmin, UsersController.updateUser);

export default router;
