import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const db_info: Object = {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_USE_DATABASE
}

export function dbInit() {
    return mysql.createConnection(db_info);
}

export function dbConnect(conn: mysql.Connection) {
    conn.connect((err) => {
        if (err) console.error('mysql connection error : ' + err);
        else console.log('mysql is connected successfully!');
    })

}