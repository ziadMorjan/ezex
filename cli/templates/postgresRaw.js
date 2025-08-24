exports.pgRawTemplate = `import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

export const query = (text, params) => pool.query(text, params);

export default pool;
`;