import React from 'react'
import ReactDOM from 'react-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { RecoilRoot } from 'recoil'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
