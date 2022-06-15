import { Theme } from '@mui/material'

/** Returns the styles for the Paper element of the note content
 * @param {Boolean} open - Whether or not the note menu is open
 * @param {Boolean} isDarkTheme - Whehter or not the dark theme is being used
 * @param {Theme} theme - The MUI theme
 * @param {Number} viewportWidth - The width of the viewport in pixels
 * @returns {Object} - Returns the styles for the Paper element of the note content
 */
export const noteContentStyles = (
  open: boolean,
  isDarkTheme: boolean,
  theme: Theme,
  viewportWidth: number
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
      zIndex: 0,
      backgroundColor: theme.palette.background,
    }
  } else if (open && !isDarkTheme) {
    styles = {
      boxShadow: 4,
      paddingBottom: 'unset',
      '& .moreButton': {
        display: 'flex',
      },
      zIndex: 0,
    }
  } else if (!open && isDarkTheme) {
    styles = {
      paddingBottom: viewportWidth > 1011 ? '2.5em' : 'unset',
      border: '1px solid #525355',
      '&:hover, &:focus': {
        boxShadow: 4,
        paddingBottom: 'unset',
        '& .moreButton': {
          display: 'flex',
        },
      },
      zIndex: 0,
      backgroundColor: theme.palette.background,
    }
  } else if (!open && !isDarkTheme) {
    styles = {
      paddingBottom: viewportWidth > 1011 ? '2.5em' : 'unset',
      '&:hover, &:focus': {
        boxShadow: 4,
        paddingBottom: 'unset',
        '& .moreButton': {
          display: 'flex',
        },
      },
      zIndex: 0,
    }
  }
  return styles
}

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
