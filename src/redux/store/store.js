
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import cashFlowReducer from '../reducers/cashFlowReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga/saga'
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

const initialState = {
  cashFlow: {
    incomeFlowData: {},
    sankeyData: '',
    modifiedExpenseData: '',
    apiData: []
  }
}

const reducers = combineReducers({
  cashFlow: cashFlowReducer
})

export default function configureStore (localInitialState) {
  const store = createStore(
    reducers,
    localInitialState || initialState,
    enhancer
  )
  sagaMiddleware.run(rootSaga)
  return store
}
