export interface IListItem {
  text: string
  done: boolean
  id: string
}

export interface IExistingNote {
  _id: string
  text: string
  title: string
  list: Array<IListItem>
  drawing: string
  drawingImage: string
  recording: string
  recordingDuration: string
  image: string
  isPinned: boolean
  userGoogleId: string
  lastEdited: number
}

export interface INewNote {
  text: string
  title: string
  list: Array<IListItem>
  drawing: string
  drawingImage: string
  recording: string
  recordingDuration: string
  image: string
  isPinned: boolean
  userGoogleId: string
  lastEdited: number
}

export type INoteType = 'text' | 'checklist' | 'drawing' | 'recording' | 'image'

export interface IDrawingColor {
  label: string
  color: string
}
