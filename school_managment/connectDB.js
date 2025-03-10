const mysql = require('mysql2')
require('dotenv').config()
const db = mysql.createConnection(process.env.DATABASE_URL)
db.connect((err)=> {
    if(err){
        console.log(err)
        process.exit(1)
    }
    else{
        console.log('MYSQL database is connected')
    }
})

module.exports = {db}
