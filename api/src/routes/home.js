import express from 'express';

const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.send('Hello there, this is the store manager API');
});

export default(router);
