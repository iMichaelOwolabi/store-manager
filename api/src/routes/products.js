import express from 'express';
import ProductsController from '../controller/products';
import Auth from '../utility/auth';

const router = express.Router();

// List all products.
router.get('/api/v1/products', Auth.verifyToken, ProductsController.getAllProducts);

// Getting a specific product
router.get('/api/v1/products/:id', Auth.verifyToken, ProductsController.getOneProduct);

// Creating a new product
router.post('/api/v1/products', Auth.verifyToken, Auth.isAdmin, ProductsController.postProduct);

// Updatinging existing product
router.put('/api/v1/products/:id', Auth.verifyToken, Auth.isAdmin, ProductsController.updateProduct);

// Delete a specific product
router.delete('/api/v1/products/:id', Auth.verifyToken, Auth.isAdmin, ProductsController.deleteProduct);

export default(router);
