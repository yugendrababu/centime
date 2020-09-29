import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Income from '../Income'
import configureStore from '../../../../redux/store/store'
import i18n from 'i18next'
import { Provider } from 'react-redux'
import { initReactI18next } from 'react-i18next'
import en from '../../../../translations/en'
import fr from '../../../../translations/fr'

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

test('test for Income Header Text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const element = getByText(/Enter the Income Details/i)
  expect(element).toBeInTheDocument()
})

test('test for input name', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const element = getByLabelText(/Enter Name/i)
  expect(element).toBeInTheDocument()
})

test('test for empty input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Input = getByTestId('incomeName')
  expect(Input).toHaveValue('')
})

test('test for salary input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Input = getByTestId('incomeName')
  fireEvent.change(Input, { target: { value: 'salary' } })
  expect(Input).toHaveValue('salary')
})

test('test for input Amount', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const element = getByLabelText(/Enter Amount/i)
  expect(element).toBeInTheDocument()
})

test('test for empty input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Input = getByTestId('incomeAmount')
  expect(Input).toHaveValue(null)
})

test('test for salary input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Input = getByTestId('incomeAmount')
  fireEvent.change(Input, { target: { value: 1000 } })
  expect(Input).toHaveValue(1000)
})

test('test for add button text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const addButton = getByText(/ADD/i)
  expect(addButton).toBeInTheDocument()
})

test('test for add button', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const incomeInput = getByTestId('incomeName')
  const amountInput = getByTestId('incomeAmount')
  const addButton = getByText(/ADD/i)
  fireEvent.change(incomeInput, { target: { value: 'salary' } })
  fireEvent.change(amountInput, { target: { value: 1000 } })
  fireEvent.click(addButton)
  const listItem = getByText((content, node) => {
    const hasText = (node) => node.textContent === 'Income Source (1) : salary , 1000'
    const nodeHasText = hasText(node)
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    )

    return nodeHasText && childrenDontHaveText
  })
  expect(listItem).toBeInTheDocument()
})

test('test for save info text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Button = getByText(/Save Info/i)
  expect(Button).toBeInTheDocument()
})

test('test for save info button', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const incomeInput = getByTestId('incomeName')
  const amountInput = getByTestId('incomeAmount')
  const addButton = getByText(/ADD/i)
  const saveButton = getByText(/Save Info/i)
  fireEvent.change(incomeInput, { target: { value: 'salary' } })
  fireEvent.change(amountInput, { target: { value: 1000 } })
  fireEvent.click(addButton)
  fireEvent.change(incomeInput, { target: { value: 'stocks' } })
  fireEvent.change(amountInput, { target: { value: 2000 } })
  fireEvent.click(addButton)
  fireEvent.click(saveButton)
  expect(saveButton).toBeInTheDocument()
})

test('test for clear info text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const Button = getByText(/Clear Info/i)
  expect(Button).toBeInTheDocument()
})

test('test for clear info button', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Income />
    </Provider>
  )
  const incomeInput = getByTestId('incomeName')
  const amountInput = getByTestId('incomeAmount')
  const addButton = getByText(/ADD/i)
  const clearButton = getByText(/Clear Info/i)
  fireEvent.change(incomeInput, { target: { value: 'salary' } })
  fireEvent.change(amountInput, { target: { value: 1000 } })
  fireEvent.click(addButton)
  fireEvent.change(incomeInput, { target: { value: 'salary' } })
  fireEvent.change(amountInput, { target: { value: 1000 } })
  fireEvent.click(addButton)
  fireEvent.click(clearButton)
  expect(clearButton).toBeInTheDocument()
})
