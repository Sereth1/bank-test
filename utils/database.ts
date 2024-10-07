

import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '202.61.224.164',
    user: 'n1ghtw0olf',
    password: 't3r4st10s',
    database: 'banking_app',
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
