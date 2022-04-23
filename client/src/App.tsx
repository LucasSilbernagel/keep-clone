import { ThemeProvider } from '@mui/material/styles'
import Home from './Views/Home'
import { Grid, CssBaseline } from '@mui/material'
import { lightTheme } from './themes'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Grid container>
          <Home />
        </Grid>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
