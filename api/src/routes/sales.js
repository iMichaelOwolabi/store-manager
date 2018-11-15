import express from 'express';
import SalesController from '../controller/sales';
import Auth from '../utility/auth';

const router = express.Router();

// Get all sales record
router.get('/api/v1/sales', Auth.verifyToken, Auth.isAdmin, SalesController.getAllSales);

// Getting a specific sales record
router.get('/api/v1/sales/:salesId', Auth.verifyToken, SalesController.getOneUserSales);

// Creating a new sales record
router.post('/api/v1/sales', Auth.verifyToken, Auth.isUser, SalesController.postSales);

export default(router);
