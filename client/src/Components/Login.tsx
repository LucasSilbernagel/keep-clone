import { Dispatch, SetStateAction } from 'react'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

interface IComponentProps {
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  getNotes: () => void
}

const Login = (props: IComponentProps): JSX.Element => {
  const { setAuthenticated, getNotes } = props

  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('profileObj' in res) {
      const googleProfile = res.profileObj
      try {
        localStorage.setItem('userProfile', JSON.stringify(googleProfile))
        setAuthenticated(true)
        getNotes()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const googleFailure = () => {
    console.error('Google sign in was unsuccessful')
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
    </>
  )
}

export default Login
