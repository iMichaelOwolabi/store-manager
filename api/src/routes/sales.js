import express from 'express';

import {
  getAllSales,
  getOneUserSales,
  getOneSalesForOneUser,
  postSales,
} from '../controller/sales';

const router = express.Router();

// Get all sales record
router.get('/api/v1/sales', getAllSales);

// Getting a specific sales record
router.get('/api/v1/sales/:user', getOneUserSales);

router.get('/api/v1/sales/:user/:id', getOneSalesForOneUser);

// Creating a new sales record
router.post('/api/v1/sales', postSales);

export default(router);
