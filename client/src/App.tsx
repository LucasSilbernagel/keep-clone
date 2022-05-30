import { ThemeProvider } from '@mui/material/styles'
import Home from './Views/Home'
import { Grid, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './themes'
import { atomIsDarkTheme } from './atoms'
import { useRecoilValue } from 'recoil'

const App = () => {
  const isDarkTheme = useRecoilValue(atomIsDarkTheme)
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container>
        <Home />
      </Grid>
    </ThemeProvider>
  )
}

export default App
