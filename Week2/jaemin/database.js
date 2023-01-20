const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'backstudy',
    password: 'jaemin5548'
})

module.exports = pool.promise();