const mysql = require('mysql')
//const Connection = require('mysql/lib/Connection')

const pool = mysql.createPool({


   
    // password: 'manager',
    host: 'cdac-project-database.clujqmrc2v0y.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'managers',

    database: 'train_reservation_db',
    port: 3306,

    connectionLimit: 20
})

module.exports = {
    pool,
}