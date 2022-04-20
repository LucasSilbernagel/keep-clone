import { ThemeProvider } from '@mui/material/styles'
import NoteViewLogical from './Views/Home'
import { Grid, CssBaseline } from '@mui/material'
import { lightTheme } from './themes'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Grid container>
          <NoteViewLogical />
        </Grid>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
