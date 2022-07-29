import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const NoteListSchema = new Schema({
  text: String,
  done: Boolean,
  id: String,
})

const NoteSchema = new Schema({
  text: String,
  title: String,
  list: [NoteListSchema],
  drawing: String,
  drawingImage: String,
  recording: String,
  recordingDuration: String,
  image: String,
  isPinned: Boolean,
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
