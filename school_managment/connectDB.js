const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bobo232324',
    database: 'school'
}
)
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