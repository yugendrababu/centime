import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './redux/store/store'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en'
import fr from './translations/fr'

i18n
  .use(initReactI18next) // passing i18next to down react components
  .init({
    resources: {
      en,
      fr
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

const store = configureStore() // create redux store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // render at root div
)

serviceWorker.unregister()
