import { Dispatch, SetStateAction } from 'react'
import { Grid, Typography, Paper, useTheme } from '@mui/material'
import keep_icon from '../assets/keep_icon.png'
import GitHubIcon from '@mui/icons-material/GitHub'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { getNotes } from '../LogicHelpers'
import { atomNotes, atomIsLoading } from '../atoms'
import { useSetRecoilState } from 'recoil'

interface IComponentProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  authenticationFailed: boolean
  setAuthenticationFailed: Dispatch<SetStateAction<boolean>>
  authenticationFailedMessage: string
  setAuthenticationFailedMessage: Dispatch<SetStateAction<string>>
}

const Login = (props: IComponentProps): JSX.Element => {
  const {
    setAuthenticated,
    authenticationFailed,
    setAuthenticationFailed,
    authenticationFailedMessage,
    setAuthenticationFailedMessage,
  } = props

  const theme = useTheme()

  const setIsLoading = useSetRecoilState(atomIsLoading)

  const setNotes = useSetRecoilState(atomNotes)

  const googleSuccess = async (res: CredentialResponse) => {
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`)
      .then((res) => res.json())
      .then((response) => {
        const googleProfile = {
          imageUrl: response.picture,
          name: response.name,
          email: response.email,
          googleId: response.sub,
        }
        localStorage.setItem('userProfile', JSON.stringify(googleProfile))
        setAuthenticated(true)
        getNotes(setIsLoading, setNotes)
        setAuthenticationFailed(false)
      })
      .catch((error) => {
        setAuthenticationFailed(true)
        setAuthenticationFailedMessage(
          `Google sign in was unsuccessful. ${error}`
        )
        console.error(error)
      })
  }
  const googleError = (error: Error) => {
    setAuthenticationFailed(true)
    setAuthenticationFailedMessage(`Google sign in was unsuccessful. ${error}`)
    console.error('Google authentication failed', error)
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
                onSuccess={googleSuccess}
                onError={() => googleError(new Error())}
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
