import { nanoid } from 'nanoid'

export const BLANK_EXISTING_NOTE = {
  _id: '',
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  userGoogleId: '',
  lastEdited: 0,
}

export const BLANK_NEW_NOTE = {
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  userGoogleId: '',
  lastEdited: 0,
}
