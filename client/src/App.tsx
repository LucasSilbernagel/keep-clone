import { CssBaseline, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useRecoilValue } from 'recoil'

import { atomIsDarkTheme } from './atoms'
import { darkTheme, lightTheme } from './themes'
import Home from './Views/Home'

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
