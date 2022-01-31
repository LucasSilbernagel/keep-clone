const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  text: {
    type: String,
    required: [true, 'The note text field is required'],
  },
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
