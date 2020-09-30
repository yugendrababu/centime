import constants from './constants'

export const saveincomeFlowData = (data) =>
  ({ type: constants.SAVE_INCOME_FLOW_DATA, payload: data })

export const saveSankeyData = (data) => ({
  type: constants.SAVE_SANKEY_DATA, payload: data
})

export const sendExpenseData = (data) => ({
  type: constants.SEND_EXPENSE_DATA, payload: data
})

export const getApiData = (data) => ({
  type: constants.GET_API_DATA
})
