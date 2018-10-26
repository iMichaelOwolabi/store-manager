import express from 'express';

import salesController from '../../../controller/sales';

const router = express.Router();

const { getAllSales, getOneSales, postSales } = salesController;

// Get all sales record
router.get('/', getAllSales);

// Getting a specific sales record
router.get('/:id', getOneSales);

// Creating a new sales record
 router.post('/', postSales);

export default(router);