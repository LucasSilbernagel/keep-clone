import { ThemeProvider } from '@mui/material/styles'
import NoteViewLogical from './Views/NoteView/NoteViewLogical'
import { Grid } from '@mui/material'
import { lightTheme } from './themes'

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container>
        <NoteViewLogical />
      </Grid>
    </ThemeProvider>
  )
}

export default App
