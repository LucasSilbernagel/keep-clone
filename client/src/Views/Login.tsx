import { Dispatch, SetStateAction } from 'react'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { Grid, Typography, Paper, useTheme } from '@mui/material'
import keep_icon from '../assets/keep_icon.png'
import GitHubIcon from '@mui/icons-material/GitHub'

interface IComponentProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  getNotes: () => void
  authenticationFailed: boolean
  setAuthenticationFailed: Dispatch<SetStateAction<boolean>>
  authenticationFailedMessage: string
  setAuthenticationFailedMessage: Dispatch<SetStateAction<string>>
}

const Login = (props: IComponentProps): JSX.Element => {
  const {
    setAuthenticated,
    getNotes,
    authenticationFailed,
    setAuthenticationFailed,
    authenticationFailedMessage,
    setAuthenticationFailedMessage,
  } = props

  const theme = useTheme()

  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('profileObj' in res) {
      const googleProfile = res.profileObj
      try {
        localStorage.setItem('userProfile', JSON.stringify(googleProfile))
        setAuthenticated(true)
        getNotes()
        setAuthenticationFailed(false)
      } catch (error) {
        setAuthenticationFailed(true)
        setAuthenticationFailedMessage(
          `Google sign in was unsuccessful. ${error}.`
        )
      }
    }
  }

  const googleFailure = () => {
    setAuthenticationFailed(true)
  }

  return (
    <Grid container>
      <Grid container item direction="column" alignItems="center" lg={12}>
        <Grid
          item
          sx={{
            margin: '1em 0 1em 0',
          }}
        >
          <Typography variant="h1">Keep Clone</Typography>
        </Grid>
        <Grid item sx={{ marginBottom: '1em' }}>
          <img src={keep_icon} alt="Google Keep logo" />
        </Grid>
        <Paper sx={{ maxWidth: '600px', padding: '1em' }} elevation={3}>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
              <Typography>
                Keep Clone is a clone of Google Keep built with the MERN stack (
                <a
                  href="https://www.mongodb.com/"
                  style={{ color: theme.palette.secondary.main }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  MongoDB
                </a>
                ,{' '}
                <a
                  href="https://expressjs.com/"
                  style={{ color: theme.palette.secondary.main }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Express
                </a>
                ,{' '}
                <a
                  href="https://reactjs.org/"
                  style={{ color: theme.palette.secondary.main }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  React
                </a>
                , and{' '}
                <a
                  href="https://nodejs.org/en/"
                  style={{ color: theme.palette.secondary.main }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Node.js
                </a>
                ).
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                Log in with your Google account using the button below. For
                demonstration purposes, this project uses a free MongoDB
                database, so space is limited. Each saved note will be
                automatically deleted 10 minutes after it is created.
              </Typography>
            </Grid>
            <Grid item>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                buttonText="Login"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </Grid>
            {authenticationFailed ? (
              <Grid item>
                <Typography sx={{ color: '#D83628' }}>
                  {authenticationFailedMessage}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        sx={{ marginTop: '2em' }}
        spacing={2}
      >
        <Grid
          item
          sx={{
            '& a': {
              color: theme.palette.secondary.main,
              textDecoration: 'none',
              '&:hover, &:focus': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          <a
            href="https://github.com/LucasSilbernagel/keep-clone"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Grid container spacing={1}>
              <Grid item>
                <GitHubIcon />
              </Grid>
              <Grid item>
                <Typography>GitHub</Typography>
              </Grid>
            </Grid>
          </a>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              '& a': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            Built by{' '}
            <a
              href="https://lucassilbernagel.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Lucas Silbernagel
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
