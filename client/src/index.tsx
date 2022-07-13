import { GoogleOAuthProvider } from '@react-oauth/google'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './App'
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
