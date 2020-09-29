import React from 'react'
import { render } from '@testing-library/react'
import SankeyDiagram from '../SankeyDiagram'
import configureStore from '../../../redux/store/store'
import { Provider } from 'react-redux'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../../translations/en'
import fr from '../../../translations/fr'

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

const initialState = {
  cashFlow: {
    incomeFlowData: {},
    sankeyData: ''
  }
}
const store = configureStore(initialState)
const component = (
  <Provider store={store}>
    <SankeyDiagram />
  </Provider>)

test('test for Sankey Diagram text', () => {
  const { getByText } = render(component)
  const linkElement = getByText(/Sankey Diagram/i)
  expect(linkElement).toBeInTheDocument()
})
test('test for no options text', () => {
  const { getByText } = render(component)
  const linkElement = getByText(/No Data Available . Please Provide the Details/i)
  expect(linkElement).toBeInTheDocument()
})
test('test for no options text', () => {
  const { getByText } = render(component)
  const linkElement = getByText(/No Data Available . Please Provide the Details/i)
  expect(linkElement).toBeInTheDocument()
})

test('test for Language select', () => {
  const initialState = {
    cashFlow: {
      incomeFlowData: {},
      sankeyData: [
        ['From', 'To,', 'cash'],
        ['stocks', 'bill', 6000],
        ['salary', 'bill', 6000]
      ]
    }
  }
  const store = configureStore(initialState)
  const { getByText } = render(
    <Provider store={store}>
      <SankeyDiagram />
    </Provider>
  )
  const chart = getByText('Loading Chart')
  expect(chart).toBeInTheDocument()
})
