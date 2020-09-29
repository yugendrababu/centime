import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'
import configureStore from '../redux/store/store'
import { Provider } from 'react-redux'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../translations/en'
import fr from '../translations/fr'

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

const store = configureStore()

test('renders app', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>)
  const linkElement = getByText(/language/i)
  expect(linkElement).toBeInTheDocument()
})
