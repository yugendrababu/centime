  
import { createStore, combineReducers } from 'redux';
import cashFlowReducer from '../reducers/cashFlowReducer';

const initialState = {
    cashFlow: {
        cashFlowData: {},
        sankeyData:''
    }
};

const reducers = combineReducers({
  cashFlow:cashFlowReducer
});

export default function configureStore(localInitialState) {
  const store = createStore(reducers,localInitialState||initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  return store;
}