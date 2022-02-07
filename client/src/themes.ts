import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const fontFamilyRoboto = {
  fontFamily: [
    'Roboto',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
}

const lightMuiTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      main: '#FAFAFA', // Drawing background
      light: '#FFFFFF', // White
      dark: '#F1F3F4', // Input background
      contrastText: '#606368', // Light text
    },
    secondary: {
      main: '#202124', // Dark text
      light: '#606368', // Light text
      dark: '#000000', // Black
      contrastText: '#FFFFFF' // White
    },
    info: {
      main: '#FABD06', // Medium accent (yellow)
      light: '#FEF0C3', // Light accent (yellow)
      dark: '#F3A430', // Dark accent (yellow)
      contrastText: '#000000', // Black
    },
    success: {
      main: '#1C72E8', // Blue
      light: '#4385F4', // Other blue
      dark: '#F5F5F5', // Grey
      contrastText: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: fontFamilyRoboto.fontFamily,
    overline: {
      fontWeight: 500,
      fontSize: '0.7rem',
    },
  },
})

const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      main: '#FAFAFA', // Drawing background
      light: '#000000', // Black
      dark: '#525355', // Input background
      contrastText: '#9AA0A6', // Light text
    },
    secondary: {
      main: '#E8EAED', // Dark text
      light: '#9AA0A6', // Light text
      dark: '#FFFFFF', // White
      contrastText: '#FFFFFF' // White
    },
    info: {
      main: '#FABD06', // Medium accent (yellow)
      light: '#42341C', // Light accent (yellow)
      dark: '#F19900', // Dark accent (yellow)
      contrastText: '#FFFFFF', // White
    },
    success: {
      main: '#8AB5F8', // Blue
      light: '#4385F4', // Other blue
      dark: '#3C4043', // Grey
      contrastText: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: fontFamilyRoboto.fontFamily,
    overline: {
      fontWeight: 500,
      fontSize: '0.7rem',
    },
  },
})

export const lightTheme = responsiveFontSizes(lightMuiTheme)
export const darkTheme = responsiveFontSizes(darkMuiTheme)