import constants from './../actions/constants';

const initialState = {
  cashFlowData: {},
  sankeyData:''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.SAVE_CASH_FLOW_DATA: return { ...state, cashFlowData: action.payload };
    case constants.SAVE_SANKEY_DATA: return { ...state, sankeyData: action.payload };
    default: return { ...state };
  }
}