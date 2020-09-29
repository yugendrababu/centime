import constants from './constants'

export const saveCashFlowData = (data) =>
  ({ type: constants.SAVE_CASH_FLOW_DATA, payload: data })

export const saveSankeyData = (data) => ({
  type: constants.SAVE_SANKEY_DATA, payload: data
})

export const sendExpenseData = (data) => ({
  type: constants.SEND_EXPENSE_DATA, payload: data
})
