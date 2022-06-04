export interface IExistingNote {
  _id: string
  text?: string
  title?: string
  userGoogleId?: string
  lastEdited: number
}

export interface INewNote {
  text?: string
  title?: string
  userGoogleId: string
  lastEdited: number
}

export type NoteType = 'text' | 'checklist' | 'drawing' | 'recording' | 'image'
