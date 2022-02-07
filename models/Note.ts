import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const NoteSchema = new Schema({
  text: {
    type: String,
  },
})

const Note = model('Note', NoteSchema)

export default Note
