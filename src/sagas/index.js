import { all, fork } from 'redux-saga/effects'
import watchCitySagas from './citySagas';

export default function* rootSaga() {
  // yield take(REHYDRATE);
  yield all([
    fork(watchCitySagas)
  ])
}
