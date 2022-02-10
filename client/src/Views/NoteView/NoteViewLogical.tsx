import { useState, useEffect, BaseSyntheticEvent } from 'react'
import axios from 'axios'
import NoteViewPresentational from './NoteViewPresentational'
import { ENote } from '../../Enums'
import { INote } from '../../Interfaces'

const NoteViewLogical = () => {
  /** Saved notes */
  const [notes, setNotes] = useState<INote[]>([])
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useState('')
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] = useState<INote>(ENote)
  /** A new note */
  const [newNote, setNewNote] = useState<INote>(ENote)

  /** Returns all saved notes */
  const getNotes = () => {
    axios
      .get('/api/notes')
      .then((res) => {
        if (res.data) {
          setNotes(res.data)
        }
      })
      .catch((err) => console.log(err))
  }

  /** Display all saved notes when the page first loads */
  useEffect(() => {
    getNotes()
  }, [])

  /** Delete a note with a specific ID */
  const deleteNote = (id: string) => {
    axios
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.data) {
          getNotes()
        }
      })
      .catch((err) => console.log(err))
  }

  /** Edit a note with a specific ID */
  const editNote = (id: string) => {
    setEditingID(id)
    setNoteBeingEdited(notes.find((note) => note._id === id) ?? ENote)
  }

  /** Change the text of a note as the user types into the editing field */
  const handleNoteTextChange = (e: BaseSyntheticEvent) => {
    setNoteBeingEdited((prevNote) => {
      const newNote = { ...prevNote }
      newNote.text = e.target.value
      return newNote
    })
  }

  /** Cancel editing a note */
  const cancelEdit = () => {
    setEditingID('')
    setNoteBeingEdited(ENote)
  }

  /** Save an edited note to the database */
  const saveNote = () => {
    if (noteBeingEdited.text.length > 0) {
      axios
        .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
        .then((res) => {
          if (res.data) {
            getNotes()
          }
        })
        .then(() => {
          setEditingID('')
          setNoteBeingEdited(ENote)
          setNewNote(ENote)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <NoteViewPresentational
      getNotes={getNotes}
      notes={notes}
      deleteNote={deleteNote}
      editNote={editNote}
      editingID={editingID}
      saveNote={saveNote}
      cancelEdit={cancelEdit}
      handleNoteTextChange={handleNoteTextChange}
      newNote={newNote}
      setNewNote={setNewNote}
      noteBeingEdited={noteBeingEdited}
    />
  )
}

export default NoteViewLogical
