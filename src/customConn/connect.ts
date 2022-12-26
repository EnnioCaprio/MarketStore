import knex, { Knex } from 'knex';
require('dotenv');

interface IKnexConfig {
    [key: string]: any
}

const environment = process.env.NODE_ENV || 'development';

class Connect {
    _pool: Knex | undefined;

    open(options: IKnexConfig) {
        this._pool = knex(options[environment]);
    }

    close() {
        return this._pool?.destroy();
    }

    query() {
        return this._pool;
    }

}

export default new Connect();