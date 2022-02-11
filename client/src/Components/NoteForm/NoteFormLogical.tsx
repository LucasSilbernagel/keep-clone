import { Dispatch, SetStateAction, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import NoteFormPresentational from './NoteFormPresentational'
import { INote } from '../../Interfaces'

interface IComponentProps {
  getNotes: () => void
  editingID: string
  newNote: INote
  setNewNote: Dispatch<SetStateAction<INote>>
}

const NoteFormLogical = (props: IComponentProps) => {
  const { getNotes, editingID, newNote, setNewNote } = props

  /** Keep track of the new note text as the user types in the text field */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({
      text: e.target.value,
      _id: '',
    })
  }

  /** Save the new note to the database */
  const saveNewNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newNote.text.length > 0) {
      axios
        .post('/api/notes', newNote)
        .then((res) => {
          if (res.data) {
            getNotes()
            setNewNote({ text: '', _id: '' })
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <NoteFormPresentational
      saveNewNote={saveNewNote}
      handleChange={handleChange}
      newNote={newNote}
      editingID={editingID}
    />
  )
}

export default NoteFormLogical