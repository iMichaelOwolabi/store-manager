import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL_TEST,
});

db.on('connect', () => {
  console.log('connected to the Database');
});

let values;

const userQuery = 'INSERT INTO users(username,password,role) VALUES ($1, $2, $3)';
const hashedPassword = bcrypt.hashSync('admin1*', 10);
values = ['admin', hashedPassword, 'superadmin'];
db.query(userQuery, values)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });

const productsQuery = 'INSERT INTO products(productname,price,quantity,mininventoryqty,productimage) VALUES ($1, $2, $3, $4, $5)';
values = ['Vintage Bow Tie', 300.21, 7, 1, 'https://imageurl.com/image1.png'];
db.query(productsQuery, values)
  .then((res) => {
    console.log(res);
    // pool.end();
  })
  .catch((err) => {
    console.log(err);
    // pool.end();
  });
