const express = require('express')
const mongoose = require('mongoose')
const Note = require('./note')

var app = express()

mongoose.connect('mongodb://localhost/shopping', {
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

// Fetch Notes
app.get('/notes', (req, res) => {
    // Alternative method without using promise

    // Note.find({}, (err, notes) => {
    //     if (err) {
    //         console.log('failed to fetch')
    //         console.log(err)
    //     } else {
    //         console.log('fetched ' + notes.length + ' notes')
    //         res.send(notes)
    //     }
    // })

    Note.find({})
        .exec()
        .then((notes) => {
            console.log('fetched ' + notes.length + ' notes')
            res.send(notes)
        }).catch((err) => {
            console.log('failed to fetch')
            console.log(err)
        })
})

// Create a Note
app.post('/note', (req, res) => {
    var note = new Note({
        shop: req.get('shop'),
        title: req.get('title'),
        price: req.get('price'),
        unit: req.get('unit'),
        expire: req.get('expire')
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log('note saved')
            res.send('note saved')
        } else {
            console.log('failed to save the note')
        }
    })
})
// Delete a Note
app.delete('/note', (req, res) => {
    const idToDelete = req.get('id')
    Note.findOneAndRemove({
        _id: idToDelete
    }, (err) => {
        if (err) {
            console.log('failed to delete ' + idToDelete)
            console.log(err)
        }
    })

    console.log('note-' + idToDelete + ' deleted')
    res.send('note-' + idToDelete + ' deleted')
})
// Update a Note
app.patch('/note', (req, res) => {
    const idToUpdate = req.get('id')
    Note.findOneAndUpdate({
        _id: idToUpdate
    }, {
        shop: req.get('shop'),
        title: req.get('title'),
        price: req.get('price'),
        unit: req.get('unit'),
        expire: req.get('expire')
    }, (err) => {
        if (err) {
            console.log('failed to update ' + idToUpdate)
            console.log(err)
        }
    })

    console.log('note-' + idToUpdate + ' updated')
    res.send('note-' + idToUpdate + ' updated')
})