import express from 'express';

import homeRoute from './home';

import usersRoute from './api/v1/users';

import productsRoute from './api/v1/products';

import salesRoute from './api/v1/sales';

const router = express.Router();

router.use('/', homeRoute);
router.use('/api/v1/users', usersRoute);
router.use('/api/v1/products', productsRoute);
router.use('/api/v1/sales', salesRoute);

export default(router);
