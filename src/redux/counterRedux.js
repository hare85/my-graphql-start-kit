import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  increment: null,
  decrement: null,
  incrementIfOdd: null,
  incrementAsync: null,
});

export const CounterTypes = Types;
export default Creators;
export const INITIAL_STATE = Immutable({
  state: 0,
});

const increment = (state) => {
  const newState = state.state + 1;
  return state.merge({ state: newState });
};

const incrementIfOdd = (state) => {
  const newState = state.state % 2 !== 0 ? state.state + 1 : state.state;
  return state.merge({ state: newState });
};

const decrement = (state) => {
  const newState = state.state - 1;
  return state.merge({ state: newState });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INCREMENT]: increment,
  [Types.DECREMENT]: decrement,
  [Types.INCREMENT_IF_ODD]: incrementIfOdd,
  [Types.INCREMENT_ASYNC]: null,
});
