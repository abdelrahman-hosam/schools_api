const express = require('express')
const app = express()
const http = require('http')
const helmet = require('helmet')
const {insertSchool} = require('./api/insert')
const {listSchools} = require('./api/list')
const PORT = process.env.PORT || 8000

const server = http.createServer(app)

//middleware
app.use(express.json())
app.use(helmet())

//api endpoints
app.post('/addSchool', insertSchool)
app.get('/listSchools', listSchools)

server.listen(PORT, ()=> console.log('server is running'))