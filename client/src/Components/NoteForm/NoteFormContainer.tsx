import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import NoteForm from './NoteForm'
import { INewNote } from '../../Interfaces'

interface IComponentProps {
  newNote: INewNote
  setNewNote: Dispatch<SetStateAction<INewNote>>
  finishCreatingNote: () => void
}

const NoteFormContainer = (props: IComponentProps) => {
  const { newNote, setNewNote, finishCreatingNote } = props

  /** Keep track of the new note text as the user types in the text field */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({
      text: e.target.value,
      userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
    })
  }

  return (
    <NoteForm
      handleChange={handleChange}
      newNote={newNote}
      finishCreatingNote={finishCreatingNote}
    />
  )
}

export default NoteFormContainer
