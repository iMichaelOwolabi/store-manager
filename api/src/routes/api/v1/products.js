const express = require('express');

const router = express.Router();

const productController = require('../../../controller/products');

const { updateProduct, getOne, getAll, postProduct, deleteProduct } = productController;

// List all products.
router.get('/', getAll);

// Getting a specific product
router.get('/:id', getOne);

// Creating a new product
router.post('/', postProduct);

// Updatinging existing product
router.put('/:id', updateProduct);

// Delete a specific product
router.delete('/:id', deleteProduct);

module.exports = router;