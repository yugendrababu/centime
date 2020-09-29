import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Expenses from '../Expenses'
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
const data = [
  {
    name: 'salary',
    amount: '10000'
  },
  {
    name: 'stocks',
    amount: '20000'
  }
]
const initialState = {
  cashFlow: {
    incomeFlowData: data,
    sankeyData: '',
    modifiedExpenseData: ''
  }
}
const store = configureStore(initialState)

test('test for Expense Header Text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const element = getByText(/Enter the Expense Details/i)
  expect(element).toBeInTheDocument()
})

test('test for total amount', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const listItem = getByText((content, node) => {
    const hasText = (node) => node.textContent === 'Total available amount : 30000'
    const nodeHasText = hasText(node)
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    )

    return nodeHasText && childrenDontHaveText
  })
  expect(listItem).toBeInTheDocument()
})

test('test for input name', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const element = getByLabelText(/Enter Name/i)
  expect(element).toBeInTheDocument()
})

test('test for empty input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseName')
  expect(Input).toHaveValue('')
})

test('test for input Amount', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const element = getByLabelText(/Enter Amount/i)
  expect(element).toBeInTheDocument()
})

test('test for empty input', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseAmount')
  expect(Input).toHaveValue(null)
})

test('test for expense input Name', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseName')
  fireEvent.change(Input, { target: { value: 'bill' } })
  expect(Input).toHaveValue('bill')
})

test('test for expense amount Name', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseAmount')
  fireEvent.change(Input, { target: { value: 1000 } })
  expect(Input).toHaveValue(1000)
})
test('test for select empty', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseSource')
  expect(Input).toHaveValue('')
})

test('test for select option', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const Input = getByTestId('expenseSource')
  fireEvent.change(Input, { target: { value: 'stocks' } })
  const Item = getByText((content, node) => {
    const hasText = (node) => node.textContent === 'Available amount for stocks : 20000'
    const nodeHasText = hasText(node)
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    )
    return nodeHasText && childrenDontHaveText
  })
  expect(Item).toBeInTheDocument()
  expect(Input).toHaveValue('stocks')
})
test('test for listItem', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const nameInput = getByTestId('expenseName')
  const amountInput = getByTestId('expenseAmount')
  const addButton = getByText(/ADD/i)
  const selectInput = getByTestId('expenseSource')
  fireEvent.change(nameInput, { target: { value: 'bill' } })
  fireEvent.change(selectInput, { target: { value: 'stocks' } })
  fireEvent.change(amountInput, { target: { value: 9000 } })
  fireEvent.click(addButton)
  const listItem = getByText('Expense (1) : bill , 9000 (From : stocks)')
  expect(listItem).toBeInTheDocument()
})
test('test for full expense test', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const nameInput = getByTestId('expenseName')
  const amountInput = getByTestId('expenseAmount')
  const addButton = getByText(/ADD/i)
  const selectInput = getByTestId('expenseSource')
  fireEvent.change(nameInput, { target: { value: 'bill' } })
  fireEvent.change(selectInput, { target: { value: 'stocks' } })
  fireEvent.change(amountInput, { target: { value: 20000 } })
  fireEvent.click(addButton)
  const listItem = getByText('Expense (1) : bill , 20000 (From : stocks)')
  expect(listItem).toBeInTheDocument()
})
test('test for amount > current source  test', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const nameInput = getByTestId('expenseName')
  const amountInput = getByTestId('expenseAmount')
  const addButton = getByText(/ADD/i)
  const selectInput = getByTestId('expenseSource')
  fireEvent.change(nameInput, { target: { value: 'bill' } })
  fireEvent.change(selectInput, { target: { value: 'stocks' } })
  fireEvent.change(amountInput, { target: { value: 21000 } })
  fireEvent.click(addButton)
})
test('test for amount > current source  test', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const nameInput = getByTestId('expenseName')
  const amountInput = getByTestId('expenseAmount')
  const addButton = getByText(/ADD/i)
  const selectInput = getByTestId('expenseSource')
  fireEvent.change(nameInput, { target: { value: 'bill' } })
  fireEvent.change(selectInput, { target: { value: 'stocks' } })
  fireEvent.change(amountInput, { target: { value: 31000 } })
  fireEvent.click(addButton)
  const Item = getByText((content, node) => {
    const hasText = (node) => node.textContent === 'Total available amount : -1000'
    const nodeHasText = hasText(node)
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    )

    return nodeHasText && childrenDontHaveText
  })
  expect(Item).toBeInTheDocument()
})
test('test for submit button', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const element = getByText(/Submit/i)
  expect(element).toBeInTheDocument()
})

test('test for submit button action', () => {
  const { getByTestId, getByText } = render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  )
  const nameInput = getByTestId('expenseName')
  const amountInput = getByTestId('expenseAmount')
  const addButton = getByText(/ADD/i)
  const submitButton = getByText(/Submit/i)
  const selectInput = getByTestId('expenseSource')
  fireEvent.change(selectInput, { target: { value: 'stocks' } })
  fireEvent.change(nameInput, { target: { value: 'bill' } })
  fireEvent.change(amountInput, { target: { value: 9000 } })
  fireEvent.click(addButton)
  fireEvent.click(submitButton)
  const Item = getByText('Expense (1) : bill , 9000 (From : stocks)')
  expect(Item).toBeInTheDocument()
})
