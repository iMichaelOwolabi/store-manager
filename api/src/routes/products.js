import express from 'express';

import {
  getAllProducts,
  getOneProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../controller/products';

const router = express.Router();

// List all products.
router.get('/api/v1/products', getAllProducts);

// Getting a specific product
router.get('/api/v1/products/:id', getOneProduct);

// Creating a new product
router.post('/api/v1/products', postProduct);

// Updatinging existing product
router.put('/api/v1/products/:id', updateProduct);

// Delete a specific product
router.delete('/api/v1/products/:id', deleteProduct);

export default(router);
