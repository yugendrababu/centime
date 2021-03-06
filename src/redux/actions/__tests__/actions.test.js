import * as actions from '../actions'
import constants from '../constants'

describe('actions', () => {
  it('should create an action to save cash flow data', () => {
    const data = [{ name: 'stocks', amount: 1800 }]
    const expectedAction = {
      type: constants.SAVE_INCOME_FLOW_DATA,
      payload: data
    }
    expect(actions.saveincomeFlowData(data)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to save sankey Data', () => {
    const data = [['From', 'To,', 'cash'], ['stocks', 'bill', 200], ['salary', 'bill', 200]]
    const expectedAction = {
      type: constants.SAVE_SANKEY_DATA,
      payload: data
    }
    expect(actions.saveSankeyData(data)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to send expense data', () => {
    const data = { test: 'expense Data' }
    const expectedAction = {
      type: constants.SEND_EXPENSE_DATA,
      payload: data
    }
    expect(actions.sendExpenseData(data)).toEqual(expectedAction)
  })
})
