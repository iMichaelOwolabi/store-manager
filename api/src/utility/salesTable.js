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
    salesid SERIAL PRIMARY KEY,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount NUMERIC NOT NULL,
    userid INTEGER NOT NULL,
    salesdate TIMESTAMPTZ DEFAULT Now(),
    FOREIGN KEY (userId) REFERENCES users (userid) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (productid) ON DELETE CASCADE
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
