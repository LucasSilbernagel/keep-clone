import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atomEditingID,
  atomFilteredNotes,
  atomIsDarkTheme,
  atomIsLoading,
  atomNoteBeingEdited,
  atomNotes,
  atomNoteType,
  atomSearchValue,
  atomViewportHeight,
  atomViewportWidth,
} from '../../atoms'
import { getNotes } from '../../LogicHelpers'
import Login from '../Login'
import NoteView from '../NoteView'

const Home: React.FC = () => {
  /** Saved notes */
  const [notes, setNotes] = useRecoilState(atomNotes)
  /** State setter to update the array of filtered notes */
  const setFilteredNotes = useSetRecoilState(atomFilteredNotes)
  /** The ID of the note that is being edited */
  const editingID = useRecoilValue(atomEditingID)
  /** The note that is being edited */
  const noteBeingEdited = useRecoilValue(atomNoteBeingEdited)
  /** Whether the user has authenticated */
  const [authenticated, setAuthenticated] = useState(false)
  /** Whether there was an issue with user authentication */
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  /** Error message to display when user authentication fails */
  const [authenticationFailedMessage, setAuthenticationFailedMessage] =
    useState('Google sign in was unsuccessful.')
  /** State setter to update the width of the viewport/window, in pixels */
  const setViewportWidth = useSetRecoilState(atomViewportWidth)
  /** State setter to update the height of the viewport/window, in pixels */
  const setViewportHeight = useSetRecoilState(atomViewportHeight)
  /** The value typed into the search bar */
  const searchValue = useRecoilValue(atomSearchValue)
  /** State setter to determine whether notes are loading from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** Application theme (dark/light), saved in localStorage */
  const isDarkTheme = window.localStorage.getItem('keepCloneDarkTheme')
  /** State setter to update the application theme (light/dark) */
  const setIsDarkTheme = useSetRecoilState(atomIsDarkTheme)
  /** State setter to update the note type that is being created or viewed */
  const setNoteType = useSetRecoilState(atomNoteType)

  /** Keep track of the viewport/window dimensions */
  useEffect(() => {
    setViewportWidth(window.innerWidth)
    setViewportHeight(window.innerHeight)
    const handleResizeWindow = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [setViewportWidth, setViewportHeight])

  /** Keep user logged in on their device by default */
  useEffect(() => {
    if (window.localStorage.userProfile?.length > 0) {
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
        setFilteredNotes((matchingNotes) =>
          matchingNotes.filter((note) =>
            JSON.stringify({
              title: note.title,
              text: note.text,
              list: note.list,
            })
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
      } else if (noteBeingEdited.drawing.length > 0) {
        setNoteType('drawing')
      } else if (noteBeingEdited.recording.length > 0) {
        setNoteType('recording')
      } else if (noteBeingEdited.image.length > 0) {
        setNoteType('image')
      }
    }
  }, [
    editingID,
    noteBeingEdited.list,
    noteBeingEdited.text.length,
    noteBeingEdited.drawing.length,
    noteBeingEdited.recording.length,
    noteBeingEdited.image.length,
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

  if (authenticated) {
    return (
      <NoteView setAuthenticated={setAuthenticated} deleteNote={deleteNote} />
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
