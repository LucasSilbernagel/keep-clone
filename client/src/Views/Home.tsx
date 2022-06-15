import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import NoteView from './NoteView'
import { BLANK_EXISTING_NOTE, BLANK_NEW_NOTE } from '../Constants'
import { IExistingNote } from '../types'
import Login from './Login'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import {
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsLoading,
  atomIsDarkTheme,
  atomNoteBeingEdited,
  atomNoteList,
  atomNoteType,
} from '../atoms'
import { nanoid } from 'nanoid'

const Home = () => {
  /** Saved notes */
  const [notes, setNotes] = useState<IExistingNote[]>([])
  /** Filtered saved notes */
  const [filteredNotes, setFilteredNotes] = useState<IExistingNote[]>([])
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useState('')
  /** The note that is being edited */
  const [noteBeingEdited, setNoteBeingEdited] =
    useRecoilState(atomNoteBeingEdited)
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

  let isDarkTheme = window.localStorage.getItem('keepCloneDarkTheme')
  const setIsDarkTheme = useSetRecoilState(atomIsDarkTheme)

  const setNoteList = useSetRecoilState(atomNoteList)

  const setNoteType = useSetRecoilState(atomNoteType)

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

  /** Remember user preference for dark or light theme */
  useEffect(() => {
    if (isDarkTheme === 'true') {
      setIsDarkTheme(true)
    } else {
      setIsDarkTheme(false)
    }
  }, [isDarkTheme, setIsDarkTheme])

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

  useEffect(() => {
    if (editingID) {
      if (noteBeingEdited.text.length > 0) {
        setNoteType('text')
      } else if (noteBeingEdited.list.some((item) => item.text.length > 0)) {
        setNoteType('checklist')
      }
    }
  }, [
    editingID,
    noteBeingEdited.list,
    noteBeingEdited.text.length,
    setNoteType,
  ])

  /** Log out of the app */
  const logOut = () => {
    localStorage.setItem('userProfile', '')
    setAuthenticated(false)
    setNotes([])
  }

  /** Returns all saved notes */
  const getNotes = () => {
    setIsLoading(true)
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
  }

  /** Edit a note with a specific ID */
  const editNote = (id: string) => {
    setEditingID(id)
    setNoteBeingEdited(
      filteredNotes.find((note) => note._id === id) ?? BLANK_EXISTING_NOTE
    )
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
      .catch((err) => console.error(err))
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
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.text = e.target.value
        editedNote.title = prevNote.title
        editedNote.lastEdited = Date.now()
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
    }
  }

  /** Change the title of a note as the user types into the editing field */
  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingID) {
      setNoteBeingEdited((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.title = e.target.value
        editedNote.lastEdited = Date.now()
        return editedNote
      })
    } else {
      setNewNote((prevNote) => {
        const editedNote = { ...prevNote }
        editedNote.title = e.target.value
        editedNote.text = prevNote.text
        editedNote.lastEdited = Date.now()
        editedNote.userGoogleId = JSON.parse(
          window.localStorage.userProfile
        ).googleId
        return editedNote
      })
    }
  }

  /** Save an edited note to the database */
  const saveNote = () => {
    if (
      (noteBeingEdited.text && noteBeingEdited.text.length > 0) ||
      (noteBeingEdited.title && noteBeingEdited.title.length > 0) ||
      noteBeingEdited.list.some((item) => item.text.length > 0)
    ) {
      axios
        .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
        .then((res) => {
          if (res.data) {
            getNotes()
          }
        })
        .then(() => {
          setEditingID('')
          setNoteBeingEdited(BLANK_EXISTING_NOTE)
          setNewNote(BLANK_NEW_NOTE)
          setNoteList([{ text: '', done: false, id: nanoid() }])
        })
        .catch((err) => console.error(err))
    } else {
      deleteNote(noteBeingEdited._id)
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
        handleNoteTitleChange={handleNoteTitleChange}
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
