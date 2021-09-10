const mongoose = require('mongoose')
const Schema = mongoose.Schema

var note = new Schema({
    shop: String,
    title: String,
    price: Number,
    unit: Number,
    expire: Date
})

const Note = mongoose.model('note', note)
module.exports = Note