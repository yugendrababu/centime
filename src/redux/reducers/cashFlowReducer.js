import constants from './../actions/constants'

const initialState = {
  incomeFlowData: {},
  sankeyData: [],
  modifiedExpenseData: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.SAVE_INCOME_FLOW_DATA: return { ...state, incomeFlowData: action.payload }
    case constants.SAVE_SANKEY_DATA: return { ...state, sankeyData: action.payload }
    case constants.SEND_EXPENSE_DATA:return { ...state, modifiedExpenseData: action.payload }
    default: return { ...state }
  }
}
