import { nanoid } from 'nanoid'

export const BLANK_EXISTING_NOTE = {
  _id: '',
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  drawing: '',
  drawingImage: '',
  recording: '',
  recordingDuration: '',
  image: '',
  userGoogleId: '',
  lastEdited: 0,
}

export const BLANK_NEW_NOTE = {
  text: '',
  title: '',
  list: [{ text: '', done: false, id: nanoid() }],
  drawing: '',
  drawingImage: '',
  recording: '',
  recordingDuration: '',
  image: '',
  userGoogleId: '',
  lastEdited: 0,
}

/** Main dividing breakpoint between mobile and desktop screen sizes. Screen width in pixels. */
export const MAIN_BREAKPOINT = 1011

/** First array of colour options to draw with */
export const FIRST_COLOR_OPTIONS = [
  { label: 'Black', color: '#000000' },
  { label: 'Red', color: '#FE5252' },
  { label: 'Yellow', color: '#FEBC00' },
  { label: 'Green', color: '#0AC853' },
  { label: 'Cyan', color: '#0FB0FF' },
  { label: 'Purple', color: '#D400F9' },
  { label: 'Brown', color: '#8D6E63' },
]

/** Second array of colour options to draw with */
export const SECOND_COLOR_OPTIONS = [
  { label: 'White', color: '#fafafa' },
  { label: 'Crimson', color: '#a52714' },
  { label: 'Amber', color: '#ee8100' },
  { label: 'Avocado Green', color: '#558b2f' },
  { label: 'Cobalt Blue', color: '#01579b' },
  { label: 'Deep Purple', color: '#8e24aa' },
  { label: 'Dark Brown', color: '#4e342e' },
]

/** Third array of colour options to draw with */
export const THIRD_COLOR_OPTIONS = [
  { label: 'Dark Grey', color: '#90a4ae' },
  { label: 'Hot Pink', color: '#ff4081' },
  { label: 'Orange', color: '#ff6e40' },
  { label: 'Lime', color: '#aeea00' },
  { label: 'Blue', color: '#304ffe' },
  { label: 'Violet', color: '#7c4dff' },
  { label: 'Teal', color: '#1de9b6' },
]

/** Fourth array of colour options to draw with */
export const FOURTH_COLOR_OPTIONS = [
  { label: 'Light Grey', color: '#cfd8dc' },
  { label: 'Light Pink', color: '#f8bbd0' },
  { label: 'Light Orange', color: '#ffccbc' },
  { label: 'Light Green', color: '#f0f4c3' },
  { label: 'Light Blue', color: '#9fa8da' },
  { label: 'Lavender', color: '#d1c4e9' },
  { label: 'Light Teal', color: '#b2dfdb' },
]

/** Array of options for drawing brush stroke size */
export const STROKE_OPTIONS = [2, 3, 5, 10, 15, 20, 30]
