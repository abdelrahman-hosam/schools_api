const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:kWcsBLrfknlkIHTXgSAsKPWNQGQakxll@mysql.railway.internal:3306/railway')
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
