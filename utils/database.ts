

import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '202.61.224.164',
    user: 'n1ghtw0olf',
    password: 'H3g7!Zp9Qw2L',
    database: 'banking_app',
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
