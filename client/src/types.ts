export interface IListItem {
  text: string
  done: boolean
}

export interface IExistingNote {
  _id: string
  text: string
  title: string
  list: Array<IListItem>
  userGoogleId: string
  lastEdited: number
}

export interface INewNote {
  text: string
  title: string
  list: Array<IListItem>
  userGoogleId: string
  lastEdited: number
}

export type NoteType = 'text' | 'checklist' | 'drawing' | 'recording' | 'image'
