const {db} = require('../connectDB')
const axios = require('axios')
const binarySortSchool = (schools, newSchool) => {
    try{
        let left = 0 , right = schools.length - 1
        while(left <= right){
            mid = Math.floor((left + right)/2)
            if(schools[mid]['distance'] === newSchool['distance']){
                left = mid
                break;
            }
            if(schools[mid]['distance'] < newSchool['distance']) left = mid + 1
            else right = mid - 1
        }
        schools.splice(left, 0, newSchool)
        return schools
    }catch(err){
        return null
    }
}

const distanceFromLongLat = (long1, long2, lat1, lat2) => {
    try{
        const earthRadius = 6371
        const longDifference = toRad(long1 - long2)
        const latDifference = toRad(lat1 - lat2)
        var a = 
        Math.sin(latDifference/2) * Math.sin(latDifference/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(longDifference/2) * Math.sin(longDifference/2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return earthRadius * c
    }catch(err){
        return null
    }
}

const toRad = (deg) => {
    try{
        return deg * (Math.PI/180)
    }catch(err){
        return null
    }
}

const getSortedSchools = async(schools, lat, long) => {
    let url = ''
    let sortedSchools = []
    for(let school of schools){
        const distance = distanceFromLongLat(long, school['longitude'], lat, school['latitude'])
        if(!distance) return null
        const schoolData = {
            'name': school['name'],
            'address': school['address'],
            'distance':distance
        }
        sortedSchools = binarySortSchool(sortedSchools, schoolData)
    }
    return sortedSchools
}

const listSchools = async(req,res) => {
    try{
        const longitude = parseFloat(req.query.long)
        const latitude = parseFloat(req.query.lat)
        const [schools] = await db.promise().query('SELECT name, address, longitude, latitude FROM school')
        if(!schools[0]) return res.status(404).json({'message':'No schools were found'})
        if(!latitude || !longitude){
            return res.status(200).json({'message':'schools are retrieved in a non sorted order if you want it sorted insert your coordinates in parameters' , schools: schools})
        }
        const sortedSchools = await getSortedSchools(schools, latitude, longitude)
        if(!sortedSchools)return res.status(500).json({'message':'something went wrong'})
        return res.status(200).json({'message':'schools were found succesfully', schools: sortedSchools})
    }catch(err){
        return res.status(500).json({'message':`something went wrong ${err}`})
    }
}


module.exports = {listSchools}