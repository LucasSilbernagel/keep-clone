import { ThemeProvider } from '@mui/material/styles'
import NoteViewLogical from './Views/Home'
import { Grid, CssBaseline } from '@mui/material'
import { lightTheme } from './themes'

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Grid container>
        <NoteViewLogical />
      </Grid>
    </ThemeProvider>
  )
}

export default App
