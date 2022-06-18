import { useState, useEffect } from 'react'
import axios from 'axios'
import NoteView from './NoteView'
import { BLANK_EXISTING_NOTE, BLANK_NEW_NOTE } from '../Constants'
import Login from './Login'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import {
  atomNotes,
  atomNewNote,
  atomViewportWidth,
  atomSearchValue,
  atomIsLoading,
  atomIsDarkTheme,
  atomNoteBeingEdited,
  atomNoteList,
  atomNoteType,
  atomFilteredNotes,
  atomEditingID,
} from '../atoms'
import { nanoid } from 'nanoid'
import { getNotes } from '../LogicHelpers'

const Home = () => {
  /** Saved notes */
  const [notes, setNotes] = useRecoilState(atomNotes)
  /** State setter to update the array of filtered notes */
  const setFilteredNotes = useSetRecoilState(atomFilteredNotes)
  /** The ID of the note that is being edited */
  const [editingID, setEditingID] = useRecoilState(atomEditingID)
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
  /** The value typed into the search bar */
  const searchValue = useRecoilValue(atomSearchValue)
  /** State setter to determine whether notes are loading from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** Application theme (dark/light), saved in localStorage */
  let isDarkTheme = window.localStorage.getItem('keepCloneDarkTheme')
  /** State setter to update the application theme (light/dark) */
  const setIsDarkTheme = useSetRecoilState(atomIsDarkTheme)
  /** State setter to update the array of checklist items for each note */
  const setNoteList = useSetRecoilState(atomNoteList)
  /** State setter to update the note type that is being created or viewed */
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
    if (searchValue) {
      setTimeout(() => {
        setFilteredNotes((notes) =>
          notes.filter((note) =>
            JSON.stringify(note)
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        )
      }, 1000)
    } else {
      setFilteredNotes(notes)
    }
  }, [notes, searchValue, setFilteredNotes])

  /** Update note type state according to the contents of the note that is clicked on for editing */
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

  /** Delete a note with a specific ID */
  const deleteNote = (id: string) => {
    axios
      .delete(`/api/notes/${id}`)
      .then((res) => {
        if (res.data) {
          getNotes(setIsLoading, setNotes)
        }
      })
      .catch((err) => console.error(err))
  }

  /** Save an edited note to the database */
  const saveEditedNote = () => {
    if (
      (noteBeingEdited.text && noteBeingEdited.text.length > 0) ||
      (noteBeingEdited.title && noteBeingEdited.title.length > 0) ||
      noteBeingEdited.list.some((item) => item.text.length > 0)
    ) {
      axios
        .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
        .then((res) => {
          if (res.data) {
            getNotes(setIsLoading, setNotes)
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
        saveEditedNote={saveEditedNote}
        setAuthenticated={setAuthenticated}
        deleteNote={deleteNote}
      />
    )
  } else
    return (
      <Login
        setAuthenticated={setAuthenticated}
        authenticationFailed={authenticationFailed}
        setAuthenticationFailed={setAuthenticationFailed}
        authenticationFailedMessage={authenticationFailedMessage}
        setAuthenticationFailedMessage={setAuthenticationFailedMessage}
      />
    )
}

export default Home
