import React from 'react'
import axios from 'axios'
import NoteFormPresentational from './NoteFormPresentational'

const NoteFormLogical = (props) => {
  const { getNotes, editingID, newNote, setNewNote } = props

  /** Keep track of the new note text as the user types in the text field */
  const handleChange = (e) => {
    setNewNote({
      text: e.target.value,
    })
  }

  /** Save the new note to the database */
  const saveNewNote = (e) => {
    e.preventDefault()
    if (newNote.text.length > 0) {
      axios
        .post('/api/notes', newNote)
        .then((res) => {
          if (res.data) {
            getNotes()
            setNewNote({ text: '' })
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
