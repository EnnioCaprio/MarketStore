import { randomBytes } from 'crypto';
import format from 'pg-format';
import pool from './connect';
import select from 'dotenv';
select.config();

const {USER_DB, PASS_DB, DB_NAME, HOST} = process.env;

const OPTION_CONN = {
    testing: {
        client: "pg",
        connection: {
            database: DB_NAME,
            user: USER_DB,
            password: PASS_DB,
            host: HOST,
            port: 5432
        },
        migrations: {
            directory: './db/migrations'
        }
    }
}

class Context {
    newRole: string;

    constructor(newRole: string) {
        this.newRole = newRole
    }

    static async build() {
        const newRole = "a" + randomBytes(4).toString('hex');

        try {

            await pool.open(OPTION_CONN)

            await pool.query()?.raw(format(`CREATE ROLE %I WITH LOGIN PASSWORD %L`, newRole, newRole))

            await pool.query()?.raw(format(`CREATE SCHEMA %I AUTHORIZATION %I`, newRole, newRole))

            await pool.close();

            await pool.open({
                testing: {
                    client: "pg",
                    searchPath: newRole,
                    connection: {
                        database: DB_NAME,
                        user: newRole,
                        password: newRole,
                        host: HOST,
                        port: 5432
                    },
                    migrations: {
                        directory: './db/migrations'
                    }
                }
            });

            await pool.query()?.migrate.latest({
                schemaName: newRole
            });

            return new Context(newRole);

        } catch (err) {
            console.log("err", err);
        }
    }

    /* async reset() {

    } */

    async close() {
        await pool.close();

        await pool.open(OPTION_CONN);

        await pool.query()?.raw(format('DROP SCHEMA %I CASCADE', this.newRole))

        await pool.query()?.raw(format('DROP ROLE %I', this.newRole))

        await pool.close();
    }

}

export default Context