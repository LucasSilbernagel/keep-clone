import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import NoteViewPresentational from './NoteView'
import { ENote } from '../Enums'
import { IExistingNote, INewNote } from '../Interfaces'
import Login from './Login'

const Home = () => {
  /** Saved notes */
  const [notes, setNotes] = useState<IExistingNote[]>([])
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useState('')
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] = useState<IExistingNote>(ENote)
  /** A new note */
  const [newNote, setNewNote] = useState<INewNote>(ENote)
  /** Whether the user has authenticated */
  const [authenticated, setAuthenticated] = useState(false)
  /** Whether there was an issue with user authentication */
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  /** Error message to display when user authentication fails */
  const [authenticationFailedMessage, setAuthenticationFailedMessage] =
    useState('Google sign in was unsuccessful.')

  /** Keep user logged in on their device by default */
  useEffect(() => {
    if (window.localStorage.userProfile.length > 0) {
      setAuthenticated(true)
    }
  }, [])

  /** Log out of the app */
  const logOut = () => {
    localStorage.setItem('userProfile', '')
    setAuthenticated(false)
    setNotes([])
  }

  /** Returns all saved notes */
  const getNotes = () => {
    axios
      .get('/api/notes', {
        params: {
          userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
        },
      })
      .then((res) => {
        if (res.data) {
          setNotes(res.data)
        }
      })
      .catch((err) => console.log(err))
  }

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
  const handleNoteTextChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  if (authenticated) {
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
        logOut={logOut}
      />
    )
  } else
    return (
      <Login
        setAuthenticated={setAuthenticated}
        getNotes={getNotes}
        authenticationFailed={authenticationFailed}
        setAuthenticationFailed={setAuthenticationFailed}
        authenticationFailedMessage={authenticationFailedMessage}
        setAuthenticationFailedMessage={setAuthenticationFailedMessage}
      />
    )
}

export default Home
