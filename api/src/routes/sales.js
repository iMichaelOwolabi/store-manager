import express from 'express';

import SalesController from '../controller/sales';

const router = express.Router();

// Get all sales record
router.get('/api/v1/sales', SalesController.getAllSales);

// Getting a specific sales record
router.get('/api/v1/sales/:user', SalesController.getOneUserSales);

router.get('/api/v1/sales/:user/:id', SalesController.getOneSalesForOneUser);

// Creating a new sales record
router.post('/api/v1/sales', SalesController.postSales);

export default(router);
