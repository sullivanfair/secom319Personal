/**
 * @author Sullivan Fair
 * email: sffair@iastaste.edu
 * Date: Saturday, December 2, 2023
 */

const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "secoms319"
})

module.exports = db;