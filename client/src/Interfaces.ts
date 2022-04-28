export interface IExistingNote {
  _id: string
  text: string
  userGoogleId?: string
}

export interface INewNote {
  text: string
  userGoogleId: string
}
