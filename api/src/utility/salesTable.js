import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

db.on('connect', () => {
  console.log('connected to the Database');
});

const createSalesTable = `CREATE TABLE IF NOT EXISTS
  sales(
    id SERIAL PRIMARY KEY,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    FOREIGN KEY (productId) REFERENCES products (id),
    FOREIGN KEY (userId) REFERENCES users (id)
  )`;
db.query(createSalesTable)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });

export default db;
