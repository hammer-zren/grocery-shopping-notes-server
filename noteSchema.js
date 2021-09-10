const mongoose = require('mongoose')
const Schema = mongoose.Schema

var note = new Schema({

})

const Note = mongoose.model('note', note)

module.exports = Note