import db from './salesTable';

const salesQuery = 'INSERT INTO sales(productid,quantity,amount,userid) VALUES ($1, $2, $3, $4)';
const values = [1, 3, 70.12, 1];
db.query(salesQuery, values)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });
