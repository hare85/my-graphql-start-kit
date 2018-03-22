import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { CounterTypes } from '../redux/counterRedux';

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

export default function* counterSaga() {
  yield takeEvery(CounterTypes.INCREMENT_ASYNC, incrementAsync);
}
