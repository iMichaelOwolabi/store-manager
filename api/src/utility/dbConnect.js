// import { Pool } from 'pg';
// import pgtools from 'pgtools';
// import dotenv from 'dotenv';
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/*
pgtools.createdb({
  database: 'sm',
  user: 'postgres',
  password: 'store-admin1',
  port: '5432',
}, 'testdb', (err, res) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createUsersTable = () => {
  const createTable = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      role VARCHAR(128) NOT NULL
    )`;
  pool.query(createTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createProductsTable = () => {
  const createTable = `CREATE TABLE IF NOT EXISTS
  products(
    id SERIAL PRIMARY KEY,
    productName VARCHAR(128) NOT NULL,
    price VARCHAR(128) NOT NULL,
    quantity VARCHAR(128) NOT NULL,
    productImage VARCHAR(128) NOT NULL
  )`;
  pool.query(createTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createSalesTable = () => {
  const createTable = `CREATE TABLE IF NOT EXISTS
  sales(
    id SERIAL PRIMARY KEY,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
  )`;
  pool.query(createTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropUsersTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProductsTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropSalesTable = () => {
  const dropTable = 'DROP TABLE IF EXISTS';
  pool.query(dropTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUsersTable();
  createProductsTable();
  createSalesTable();
};

const insertUser = () => {
  const password = 'admin1*';
  const hashedPassword = bcrypt.hashSync(password, 10);
  const values = ['admin', hashedPassword, 'superadmin'];
  const adminUserQuery = 'INSERT INTO users(username,password,role) VALUES ($1, $2, $3)';
  pool.query(adminUserQuery, values)
    .then((res) => {
      console.log(res);
      pool.end();
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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTable,
  createProductsTable,
  createSalesTable,
  createAllTables,
  insertUser,
  dropUsersTable,
  dropProductsTable,
  dropSalesTable,
  dropAllTables,
};

require('make-runnable');
