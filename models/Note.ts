import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const NoteSchema = new Schema({
  text: {
    type: String,
  },
  createdAt: { type: Date, expires: '10m', default: Date.now },
})

const Note = model('Note', NoteSchema)

export default Note
