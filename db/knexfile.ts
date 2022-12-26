import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const {USER_DB, PASS_DB, DB_NAME, HOST} = process.env;

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "pg",
    connection: {
      database: DB_NAME,
      user: USER_DB,
      password: PASS_DB,
      host: HOST,
      port: 5432
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};

export default config;
