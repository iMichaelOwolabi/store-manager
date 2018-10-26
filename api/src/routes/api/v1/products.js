import express from 'express';

import productController from '../../../controller/products';

const router = express.Router();

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

export default(router);