import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});


const dropUsersTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS users CASCADE;';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

const dropProductsTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS products CASCADE;';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

const dropSalesTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS sales CASCADE;';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropAllTables = () => {
  dropUsersTable();
  dropProductsTable();
  dropSalesTable();
};

export default dropAllTables;

require('make-runnable');