import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'your_username',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD || 'your_password',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

export const query = (text, params) => pool.query(text, params);
