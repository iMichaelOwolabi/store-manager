import express from 'express';

import homeRoute from './home';

import usersRoute from './users';

import productsRoute from './products';

import salesRoute from './sales';

const router = express.Router();

router.use('/', homeRoute);
router.use('/', usersRoute);
router.use('/', productsRoute);
router.use('/', salesRoute);

router.use('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'page not found',
  });
});

export default(router);
