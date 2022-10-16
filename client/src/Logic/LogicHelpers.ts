import { Theme } from '@mui/material'
import axios from 'axios'
import { SetterOrUpdater } from 'recoil'

import { IExistingNote } from '../types'

/** Returns the styles for the Paper element of the note content
 * @param {Boolean} open - Whether or not the note menu is open
 * @param {Boolean} isDarkTheme - Whether or not the dark theme is being used
 * @param {Theme} theme - The MUI theme
 * @param {Boolean} isSelectedNote - Whether or not the note has been selected
 * @param {Array} selectedNoteIds - Array of selected note IDs
 * @returns {Object} - Returns the styles for the Paper element of the note content
 */
export const noteContentStyles: (
  open: boolean,
  isDarkTheme: boolean,
  theme: Theme,
  isSelectedNote: boolean,
  selectedNoteIds: string[]
) => Record<string, unknown> = (
  open: boolean,
  isDarkTheme: boolean,
  theme: Theme,
  isSelectedNote: boolean,
  selectedNoteIds: string[]
) => {
  let styles = {}
  const notesSelected = selectedNoteIds.length > 0
  const commonStyles = {
    zIndex: notesSelected ? 80 : 0,
  }
  const commonDarkThemeStyles = {
    border: isSelectedNote ? '1px solid #FFFFFF' : '1px solid #525355',
  }
  const commonLightThemeStyles = {
    border: isSelectedNote ? '1px solid #000000' : '1px solid transparent',
  }
  if (open && isDarkTheme) {
    styles = {
      ...commonStyles,
      ...commonDarkThemeStyles,
      boxShadow: 4,
      paddingBottom: 'unset',
      '& .moreButton': {
        display: 'flex',
      },
      '& .pinButton': {
        display: 'flex',
      },
      '& .selectButton': {
        display: 'flex',
      },
      backgroundColor: theme.palette.background,
      position: 'relative',
    }
  } else if (open && !isDarkTheme) {
    styles = {
      ...commonStyles,
      ...commonLightThemeStyles,
      boxShadow: 4,
      paddingBottom: 'unset',
      '& .moreButton': {
        display: 'flex',
      },
      '& .pinButton': {
        display: 'flex',
      },
      '& .selectButton': {
        display: 'flex',
      },
    }
  } else if (!open && isDarkTheme) {
    styles = {
      ...commonStyles,
      ...commonDarkThemeStyles,
      '& .moreButton': {
        visibility: 'hidden',
      },
      '& .pinButton': {
        visibility: 'hidden',
      },
      '& .selectButton': {
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
        '& .selectButton': {
          visibility: 'unset',
        },
      },
      backgroundColor: theme.palette.background,
      position: 'relative',
    }
  } else if (!open && !isDarkTheme) {
    styles = {
      ...commonStyles,
      ...commonLightThemeStyles,
      '& .moreButton': {
        visibility: 'hidden',
      },
      '& .pinButton': {
        visibility: 'hidden',
      },
      '& .selectButton': {
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
        '& .selectButton': {
          visibility: 'unset',
        },
      },
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noteFormStyles: any = (inModal: boolean, isDarkTheme: boolean) => {
  if (inModal && isDarkTheme) {
    return {
      backgroundColor: '#202123',
      width: '100%',
    }
  } else if (!inModal && isDarkTheme) {
    return {
      backgroundColor: '#202123',
      width: '100%',
      border: '1px solid #525355',
      borderRadius: '10px',
    }
  } else {
    return {
      width: '100%',
    }
  }
}

/** Return all of the user's saved notes from the back end
 * @param {Function} setIsLoading - State setter that determines whether notes are being loaded from the back end
 * @param {Function} setNotes - State setter that updates the notes array
 */
export const getNotes: (
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => void = (
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => {
  setIsLoading(true)
  axios
    .get(`${process.env.REACT_APP_API}/api/notes`, {
      params: {
        userGoogleId: JSON.parse(localStorage.getItem('userProfile') || '')
          .googleId,
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

/** Pushes a small note edit to the database, such as when a note is pinned or selected.
 * @param {IExistingNote} noteBeingEdited - The note being edited
 * @param {Function} setIsLoading - State setter that determines whether notes are being loaded from the back end
 * @param {Function} setNotes - State setter that updates the notes array
 */
export const pushNoteEdit: (
  noteBeingEdited: IExistingNote,
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => void = (
  noteBeingEdited: IExistingNote,
  setIsLoading: (boolean: boolean) => void,
  setNotes: SetterOrUpdater<IExistingNote[]>
) => {
  axios
    .put(
      `${process.env.REACT_APP_API}/api/notes/${noteBeingEdited._id}`,
      noteBeingEdited
    )
    .then((res) => {
      if (res.data) {
        getNotes(setIsLoading, setNotes)
      }
    })
    .catch((err) => console.error(err))
}
