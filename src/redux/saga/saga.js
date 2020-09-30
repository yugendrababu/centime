import { put, takeLatest, all, call } from 'redux-saga/effects'
import constants from '../actions/constants'
import { apiForGettingData } from './apiFetcher'
function * fetchApiData () {
  const data = yield call(apiForGettingData)
  yield put({ type: constants.SET_API_DATA, payload: data })
}
function * actionWatcher () {
  yield takeLatest(constants.GET_API_DATA, fetchApiData)
}
export default function * rootSaga () {
  yield all([
    actionWatcher()
  ])
}
