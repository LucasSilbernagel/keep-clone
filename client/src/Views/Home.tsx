import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import NoteView from './NoteView'
import { ENote } from '../Enums'
import { IExistingNote } from '../Interfaces'
import Login from './Login'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import {
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsLoading,
} from '../atoms'

const Home = () => {
  /** Saved notes */
  const [notes, setNotes] = useState<IExistingNote[]>([])
  /** Filtered saved notes */
  const [filteredNotes, setFilteredNotes] = useState<IExistingNote[]>([])
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useState('')
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] = useState<IExistingNote>(ENote)
  /** Whether the user has authenticated */
  const [authenticated, setAuthenticated] = useState(false)
  /** Whether there was an issue with user authentication */
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  /** Error message to display when user authentication fails */
  const [authenticationFailedMessage, setAuthenticationFailedMessage] =
    useState('Google sign in was unsuccessful.')
  /** State setter to update the width of the viewport/window, in pixels */
  const setViewportWidth = useSetRecoilState(atomViewportWidth)
  /** State setter to update new note */
  const setNewNote = useSetRecoilState(atomNewNote)

  const searchValue = useRecoilValue(atomSearchValue)

  const setIsLoading = useSetRecoilState(atomIsLoading)

  /** Keep track of the viewport/window width */
  useEffect(() => {
    setViewportWidth(window.innerWidth)
    const handleResizeWindow = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [setViewportWidth])

  /** Keep user logged in on their device by default */
  useEffect(() => {
    if (window.localStorage.userProfile.length > 0) {
      setAuthenticated(true)
    }
  }, [])

  /** Filter notes */
  useEffect(() => {
    setFilteredNotes(notes)
    if (searchValue) {
      setTimeout(() => {
        setFilteredNotes((notes) =>
          notes.filter((note) => JSON.stringify(note).includes(searchValue))
        )
      }, 500)
    }
  }, [notes, searchValue])

  /** Log out of the app */
  const logOut = () => {
    localStorage.setItem('userProfile', '')
    setAuthenticated(false)
    setNotes([])
  }

  /** Returns all saved notes */
  const getNotes = () => {
    setIsLoading(true)
    setTimeout(() => {
      axios
        .get('/api/notes', {
          params: {
            userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
          },
        })
        .then((res) => {
          if (res.data) {
            setNotes(res.data)
            setIsLoading(false)
          }
        })
        .catch((err) => console.error(err))
    }, 1000)
  }

  /** Edit a note with a specific ID */
  const editNote = (id: string) => {
    setEditingID(id)
    setNoteBeingEdited(filteredNotes.find((note) => note._id === id) ?? ENote)
  }

  /** Change the text of a note as the user types into the editing field */
  const handleNoteTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.text = e.target.value
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote({
        text: e.target.value,
        userGoogleId: JSON.parse(window.localStorage.userProfile).googleId,
        lastEdited: Date.now(),
      })
    }
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
        .catch((err) => console.error(err))
    }
  }

  if (authenticated) {
    return (
      <NoteView
        getNotes={getNotes}
        filteredNotes={filteredNotes}
        editNote={editNote}
        editingID={editingID}
        saveNote={saveNote}
        handleNoteTextChange={handleNoteTextChange}
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
