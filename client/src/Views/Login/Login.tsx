import GitHubIcon from '@mui/icons-material/GitHub'
import { Grid, Paper, Typography, useTheme } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { Dispatch, SetStateAction } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import keep_icon from '../../assets/keep_icon.png'
import { atomIsLoading, atomNotes, atomViewportWidth } from '../../atoms'
import { MAIN_BREAKPOINT } from '../../Constants'
import { getNotes } from '../../Logic/LogicHelpers'

interface LoginProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  authenticationFailed: boolean
  setAuthenticationFailed: Dispatch<SetStateAction<boolean>>
  authenticationFailedMessage: string
  setAuthenticationFailedMessage: Dispatch<SetStateAction<string>>
}

const Login = (props: LoginProps): JSX.Element => {
  const {
    setAuthenticated,
    authenticationFailed,
    setAuthenticationFailed,
    authenticationFailedMessage,
    setAuthenticationFailedMessage,
  } = props

  /** The application theme */
  const theme = useTheme()
  /** State setter to determine whether notes are being loaded from the back end */
  const setIsLoading = useSetRecoilState(atomIsLoading)
  /** State setter to update the notes array */
  const setNotes = useSetRecoilState(atomNotes)
  /** The width of the viewport/screen, in pixels */
  const viewportWidth = useRecoilValue(atomViewportWidth)

  /** Function called when the user authenticates successfully */
  const googleSuccess = async (res: CredentialResponse) => {
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`)
      .then((data) => data.json())
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

  /** Function called when the user does not authenticate successfully */
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
                ). It replicates the web app on larger screens and the mobile
                app on smaller screens.
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
            <Grid item>
              <Typography>
                The project components are also visually documented in{' '}
                <a
                  href="https://62de0039a0287437701c3efb-bgjbpvpnod.chromatic.com/?path=/story/about--page"
                  style={{ color: theme.palette.secondary.main }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Storybook
                </a>
                .
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        direction={viewportWidth > MAIN_BREAKPOINT ? 'row' : 'column'}
        alignItems={viewportWidth > MAIN_BREAKPOINT ? 'left' : 'center'}
        sx={{ margin: '2em auto' }}
        spacing={viewportWidth > MAIN_BREAKPOINT ? 0 : 2}
        xs={12}
        sm={6}
        xl={4}
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
        <Grid item>
          <Typography
            sx={{
              '& a': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            <a
              href="https://www.termsfeed.com/live/6bd381d4-79ef-48cd-b701-0b3c0f56b170"
              target="_blank"
              rel="noreferrer noopener"
            >
              Privacy policy
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
