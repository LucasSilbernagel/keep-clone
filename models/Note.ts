import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const NoteSchema = new Schema({
  text: {
    type: String,
  },
  title: {
    type: String,
  },
  list: {
    type: Array,
  },
  userGoogleId: {
    type: String,
    required: true,
  },
  lastEdited: {
    type: Number,
    required: true,
  },
  // expireAt: {
  //   type: Date,
  //   default: Date.now,
  //   expires: 600, // 600 seconds = 10 minutes
  // },
})

const Note = model('Note', NoteSchema)

export default Note
