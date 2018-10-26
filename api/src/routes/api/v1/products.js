import express from 'express';

import {
  getAllProducts,
  getOneProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../../../controller/products';

const router = express.Router();

// List all products.
router.get('/', getAllProducts);

// Getting a specific product
router.get('/:id', getOneProduct);

// Creating a new product
router.post('/', postProduct);

// Updatinging existing product
router.put('/:id', updateProduct);

// Delete a specific product
router.delete('/:id', deleteProduct);

export default(router);