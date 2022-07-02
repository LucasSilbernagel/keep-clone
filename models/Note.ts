import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const NoteListSchema = new Schema({
  text: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  id: {
    type: String,
  },
})

const NoteSchema = new Schema({
  text: {
    type: String,
  },
  title: {
    type: String,
  },
  list: [NoteListSchema],
  drawing: String,
  drawingImage: String,
  recording: String,
  recordingDuration: String,
  userGoogleId: {
    type: String,
    required: true,
  },
  lastEdited: {
    type: Number,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 600 seconds = 10 minutes
  },
})

const Note = model('Note', NoteSchema)

export default Note
