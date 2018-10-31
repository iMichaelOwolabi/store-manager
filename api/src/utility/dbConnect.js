import pg from 'pg';
// import dotenv from 'dotenv';

const client = new pg.Client({
  host: 'localhost',
  database: 'sm',
  user: 'postgres',
  password: 'store-admin1',
  port: '5432',
});

client.connect();
export default client;
