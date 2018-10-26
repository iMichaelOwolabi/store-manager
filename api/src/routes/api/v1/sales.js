import express from 'express';

import {
  getAllSales,
  getOneSales,
  postSales,
} from '../../../controller/sales';

const router = express.Router();

// Get all sales record
router.get('/', getAllSales);

// Getting a specific sales record
router.get('/:id', getOneSales);

// Creating a new sales record
router.post('/', postSales);

export default(router);
