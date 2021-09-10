const express = require('express')
const mongoose = require('mongoose')

var app = express()

mongoose.connect('mongodb://localhost/omtrak', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
})

mongoose.connection.once('open', () => {
    console.log('Successfully connected the DB!')
}).on('error', (err) => {
    console.log('Failed to connect the DB!')
    console.log(err)
})

const port = 8001
const host = '192.168.1.167'

var server = app.listen(port, host, () => {
    console.log('Server is up runing at http://' + host + ':' + port)
})