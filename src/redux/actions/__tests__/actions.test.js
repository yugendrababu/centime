import * as actions from '../actions';
import constants from '../constants';

describe('actions', () => {
  it('should create an action to save cash flow data', () => {
    const data = [{name:'stocks',amount:1800}];
    const expectedAction = {
      type: constants.SAVE_CASH_FLOW_DATA,
      payload:data
    }
    expect(actions.saveCashFlowData(data)).toEqual(expectedAction)
  })
})


describe('actions', () => {
    it('should create an action to save sankey Data', () => {
      const data = [['From','To,','cash'],['stocks','bill',200],['salary','bill',200]]
      const expectedAction = {
        type: constants.SAVE_SANKEY_DATA,
        payload:data
      }
      expect(actions.saveSankeyData(data)).toEqual(expectedAction)
    })
  })