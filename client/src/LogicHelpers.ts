import { Theme } from '@mui/material'
import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { IExistingNote } from './types'

/** Returns the styles for the Paper element of the note content
 * @param {Boolean} open - Whether or not the note menu is open
 * @param {Boolean} isDarkTheme - Whether or not the dark theme is being used
 * @param {Theme} theme - The MUI theme
 * @returns {Object} - Returns the styles for the Paper element of the note content
 */
export const noteContentStyles = (
  open: boolean,
  isDarkTheme: boolean,
  theme: Theme
) => {
  let styles = {}
  if (open && isDarkTheme) {
    styles = {
      boxShadow: 4,
      border: '1px solid #525355',
      paddingBottom: 'unset',
      '& .moreButton': {
        display: 'flex',
      },
      '& .pinButton': {
        display: 'flex',
      },
      zIndex: 0,
      backgroundColor: theme.palette.background,
      position: 'relative',
    }
  } else if (open && !isDarkTheme) {
    styles = {
      boxShadow: 4,
      paddingBottom: 'unset',
      '& .moreButton': {
        display: 'flex',
      },
      '& .pinButton': {
        display: 'flex',
      },
      zIndex: 0,
    }
  } else if (!open && isDarkTheme) {
    styles = {
      border: '1px solid #525355',
      '& .moreButton': {
        visibility: 'hidden',
      },
      '& .pinButton': {
        visibility: 'hidden',
      },
      '&:hover, &:focus': {
        boxShadow: 4,
        paddingBottom: 'unset',
        '& .moreButton': {
          visibility: 'unset',
        },
        '& .pinButton': {
          visibility: 'unset',
        },
      },
      zIndex: 0,
      backgroundColor: theme.palette.background,
      position: 'relative',
    }
  } else if (!open && !isDarkTheme) {
    styles = {
      '& .moreButton': {
        visibility: 'hidden',
      },
      '& .pinButton': {
        visibility: 'hidden',
      },
      '&:hover, &:focus': {
        boxShadow: 4,
        paddingBottom: 'unset',
        '& .moreButton': {
          visibility: 'unset',
        },
        '& .pinButton': {
          visibility: 'unset',
        },
      },
      zIndex: 0,
      position: 'relative',
    }
  }
  return styles
}
/** Returns the styles for the Box element container of the note form
 * @param {Boolean} inModal - Whether or not the note form is being rendered inside the modal
 * @param {Boolean} isDarkTheme - Whether or not the dark theme is being used
 * @returns {Object} - Returns the styles for the Box element container of the note form
 */
export const noteFormStyles = (inModal: boolean, isDarkTheme: boolean) => {
  if (inModal && isDarkTheme) {
    return {
      backgroundColor: '#202123',
      width: '100%',
    }
  } else if (inModal && !isDarkTheme) {
    return {
      width: '100%',
    }
  } else if (!inModal && isDarkTheme) {
    return {
      backgroundColor: '#202123',
      width: '100%',
      border: '1px solid #525355',
      borderRadius: '10px',
    }
  } else if (!inModal && !isDarkTheme) {
    return {
      width: '100%',
    }
  }
}

/** Return all of the user's saved notes from the back end
 * @param {Function} setIsLoading - State setter that determines whether notes are being loaded from the back end
 * @param {Function} setNotes - State setter that updates the notes array
 */
export const getNotes = (
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => {
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

/** Pushes a small note edit to the database, such as when a note is pinned.
 * @param {IExistingNote} noteBeingEdited - The note being edited
 * @param {Function} setIsLoading - State setter that determines whether notes are being loaded from the back end
 * @param {Function} setNotes - State setter that updates the notes array
 */
export const pushNoteEdit = (
  noteBeingEdited: IExistingNote,
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => {
  axios
    .put(`/api/notes/${noteBeingEdited._id}`, noteBeingEdited)
    .then((res) => {
      if (res.data) {
        getNotes(setIsLoading, setNotes)
      }
    })
    .catch((err) => console.error(err))
}
