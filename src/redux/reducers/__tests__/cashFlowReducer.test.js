import cashFlowReducer from '../cashFlowReducer';
import constants from '../../actions/constants';

describe('cash flow reducer', () => {
    
    it('should return the initial state', () => {
      expect(cashFlowReducer(undefined, {})).toEqual(
       {
           "cashFlowData": {}, 
           "sankeyData": ""
       })
    })
  
    it('should handle SAVE_CASH_FLOW_DATA', () => {
    const initialState =        {
        "cashFlowData": {}, 
        "sankeyData": ""
    }
    const data = [{name:'stocks',amount:1800}];
      expect(
        cashFlowReducer(initialState, {
            type: constants.SAVE_CASH_FLOW_DATA,
            payload:data
          })
      ).toEqual(
        {
            cashFlowData:data,
            sankeyData:""
        })
    })
    it('should handle SAVE_SANKEY_DATA', () => {
        const initialState =        {
            "cashFlowData": {}, 
            "sankeyData": ""
        }
        const data = [['From','To,','cash'],['stocks','bill',200],['salary','bill',200]];
          expect(
            cashFlowReducer(initialState, {
                type: constants.SAVE_SANKEY_DATA,
                payload:data
              })
          ).toEqual(
            {
                sankeyData:data,
                cashFlowData:{}
            })
    })
})