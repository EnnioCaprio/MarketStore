import app from './app';
import conn from './customConn/connect';
import select from 'dotenv';
select.config();

const { USER_DB, PASS_DB, DB_NAME, HOST } = process.env;

(() => {
    
    conn.open({
        development: {
            client: "pg",
            connection: {
                database: DB_NAME,
                user: USER_DB,
                password: PASS_DB,
                host: HOST,
                port: 5432
            }
        }
    })

    app.listen(3000, () => {
        console.log("listening on port", 3000)
    })

})()