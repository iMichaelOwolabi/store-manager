import express from 'express';

const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Hello, welcome to the store manager',
  });
});

export default(router);
