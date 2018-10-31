import express from 'express';

import ProductsController from '../controller/products';

const router = express.Router();

// List all products.
router.get('/api/v1/products', ProductsController.getAllProducts);

// Getting a specific product
router.get('/api/v1/products/:id', ProductsController.getOneProduct);

// Creating a new product
router.post('/api/v1/products', ProductsController.postProduct);

// Updatinging existing product
router.put('/api/v1/products/:id', ProductsController.updateProduct);

// Delete a specific product
router.delete('/api/v1/products/:id', ProductsController.deleteProduct);

export default(router);
