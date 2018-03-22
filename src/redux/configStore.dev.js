/* eslint-disable global-require, import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import DevTools from '../containers/DevTools';

export default function configureStore(rootReducer, rootSaga) {
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  middleware.push(logger);

  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(rootReducer, compose(...enhancers, DevTools.instrument()));

  sagaMiddleware.run(rootSaga);
  return store;
}
