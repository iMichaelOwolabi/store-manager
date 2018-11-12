import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

db.on('connect', () => {
  console.log('connected to the Database');
});

const createProductsTable = `CREATE TABLE IF NOT EXISTS
    products(
      id SERIAL PRIMARY KEY,
      productName VARCHAR(128) NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      productImage VARCHAR(200) NOT NULL
    )`;
db.query(createProductsTable)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });

const createUsersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(300) NOT NULL,
        role VARCHAR(15) NOT NULL
      )`;
db.query(createUsersTable)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });

/* const insertUser = () => {
  const password = 'admin1*';
  const hashedPassword = bcrypt.hashSync(password, 10);
  const values = ['admin', hashedPassword, 'superadmin'];
  const adminUserQuery = 'INSERT INTO users(username,password,role) VALUES ($1, $2, $3)';
  pool.query(adminUserQuery, values)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}; */
