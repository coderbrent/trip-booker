import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import './mystyles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCoffee, faCar } from '@fortawesome/free-solid-svg-icons'
import { Auth0Provider } from '@auth0/auth0-react';
import { addTrip, loadTrips } from './store/trips';

const rootElement = document.getElementById('root')
library.add(fab, faCheckSquare, faCoffee, faCar, fas)
const store = configureStore();

store.dispatch(loadTrips())

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.AUTH_0_DOMAIN}
      clientId={process.env.AUTH_0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>, rootElement
)
