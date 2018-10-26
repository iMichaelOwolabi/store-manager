const express = require('express');

const router = express.Router();

const salesController = require('../../../controller/sales');

const { getAllSales, getOneSales, postSales } = salesController;

// Get all sales record
router.get('/', getAllSales);

//Getting a apecific sales record
router.get('/:id', getOneSales);

 //Creating a new sales record
 router.post('/', postSales);

module.exports = router;