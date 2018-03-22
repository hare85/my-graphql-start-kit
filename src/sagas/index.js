/* eslint-disable global-require */
import { all, fork } from 'redux-saga/effects';

export default function* root() {
  yield all([fork(require('./counterSaga').default)]);
}
