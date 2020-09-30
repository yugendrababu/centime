import cashFlowReducer from '../cashFlowReducer'
import constants from '../../actions/constants'

describe('cash flow reducer', () => {
  it('should return the initial state', () => {
    expect(cashFlowReducer(undefined, {})).toEqual(
      {
        incomeFlowData: {},
        sankeyData: [],
        modifiedExpenseData: '',
        apiData: []
      })
  })

  it('should handle SAVE_INCOME_FLOW_DATA', () => {
    const initialState = {
      incomeFlowData: {},
      sankeyData: ''
    }
    const data = [{ name: 'stocks', amount: 1800 }]
    expect(
      cashFlowReducer(initialState, {
        type: constants.SAVE_INCOME_FLOW_DATA,
        payload: data
      })
    ).toEqual(
      {
        incomeFlowData: data,
        sankeyData: ''
      })
  })
  it('should handle SAVE_SANKEY_DATA', () => {
    const initialState = {
      incomeFlowData: {},
      sankeyData: ''
    }
    const data = [['From', 'To,', 'cash'], ['stocks', 'bill', 200], ['salary', 'bill', 200]]
    expect(
      cashFlowReducer(initialState, {
        type: constants.SAVE_SANKEY_DATA,
        payload: data
      })
    ).toEqual(
      {
        sankeyData: data,
        incomeFlowData: {}
      })
  })
  it('should handle SAVE_SANKEY_DATA', () => {
    const initialState = {
      incomeFlowData: {},
      sankeyData: '',
      modifiedExpenseData: ''
    }
    const data = { test: 'expenseData' }
    expect(
      cashFlowReducer(initialState, {
        type: constants.SEND_EXPENSE_DATA,
        payload: data
      })
    ).toEqual(
      {
        sankeyData: '',
        incomeFlowData: {},
        modifiedExpenseData: data
      })
  })
})
