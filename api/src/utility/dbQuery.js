import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.DATABASE_URL;

// eslint-disable-next-line no-cond-assign
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
}

const pool = new Pool({
  connectionString,
});

export default pool;
