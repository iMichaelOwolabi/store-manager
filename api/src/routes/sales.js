import express from 'express';

import {
  getAllSales,
  getOneSales,
  postSales,
} from '../controller/sales';

const router = express.Router();

// Get all sales record
router.get('/api/v1/sales', getAllSales);

// Getting a specific sales record
router.get('/api/v1/sales/:id', getOneSales);

// Creating a new sales record
router.post('/api/v1/sales', postSales);

export default(router);
