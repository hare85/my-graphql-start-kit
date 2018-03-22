/* eslint-disable global-require */
import { combineReducers } from 'redux';
import configureStore from './configStore';
import rootSaga from '../sagas';

export default () => {
  const rootReducer = combineReducers({
    counter: require('./counterRedux').reducer,
  });
  return configureStore(rootReducer, rootSaga);
};
