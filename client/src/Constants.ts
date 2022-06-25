import { nanoid } from 'nanoid'

export const BLANK_EXISTING_NOTE = {
  _id: '',
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  drawing: '',
  drawingImage: '',
  userGoogleId: '',
  lastEdited: 0,
}

export const BLANK_NEW_NOTE = {
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  drawing: '',
  drawingImage: '',
  userGoogleId: '',
  lastEdited: 0,
}

/** Main dividing breakpoint between mobile and desktop screen sizes. Screen width in pixels. */
export const MAIN_BREAKPOINT = 1011

/** Array of colours to draw with */
export const COLOR_OPTIONS = [
  { label: 'Black', color: '#000000' },
  { label: 'Red', color: '#FE5252' },
  { label: 'Yellow', color: '#FEBC00' },
  { label: 'Green', color: '#0AC853' },
  { label: 'Blue', color: '#0FB0FF' },
  { label: 'Purple', color: '#D400F9' },
  { label: 'Brown', color: '#8D6E63' },
]

/** Array of options for drawing brush stroke size */
export const STROKE_OPTIONS = [2, 3, 5, 10, 15, 20, 30]
