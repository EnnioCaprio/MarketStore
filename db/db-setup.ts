import knexfile from './knexfile';
import knex from 'knex';
require('dotenv');

const env = process.env.NODE_ENV || 'development';
const db = knex(knexfile[env]);

export default db;
