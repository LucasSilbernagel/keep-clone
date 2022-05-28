export interface IExistingNote {
  _id: string
  text: string
  userGoogleId?: string
  lastEdited: number
}

export interface INewNote {
  text: string
  userGoogleId: string
  lastEdited: number
}
