const {db} = require('../connectDB')

const validTypes = (type, values) => values.every(value=> typeof value === type)

const insertSchool = async(req,res)=> {
    try{
        const {name, address, longitude, latitude} = req.body
        if(!name || !address || !longitude || !latitude) return res.status(400).json({'message':'insert all the required information'})
        const areValidStrings = validTypes('string', [name, address])
        const areValidFloat = validTypes('number', [longitude, latitude])
        if(!areValidFloat || !areValidStrings) return res.status(400).json({'message':'insert the fields in their required form'})
        if(longitude > 180 || longitude < -180 || latitude > 90 || latitude < -90) return res.status(400).json({'message':'insert valid values only'})
        const [school] = await db.promise().query('INSERT INTO school(name, address, longitude, latitude) VALUES(?,?,?,?)', [name, address, longitude, latitude])
        if(school.affectedRows < 1) return res.status(500).json({'message':'something went wrong we could not add the school into the database'})
        return res.status(201).json({'message':`${name} was added succesfully`})
    }catch(err){
        return res.status(500).json({'message':`something went wrong ${err}`})
    }
}

module.exports = {insertSchool}