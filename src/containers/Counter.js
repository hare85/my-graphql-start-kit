/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CounterActions from '../redux/counterRedux';

const Counter = ({
  value, onIncrement, onIncrementAsync, onDecrement, onIncrementIfOdd,
}) => (
  <p>
    Clicked: {value} times <button onClick={onIncrement}>+</button>{' '}
    <button onClick={onDecrement}>-</button>{' '}
    <button onClick={onIncrementIfOdd}>Increment if odd</button>{' '}
    <button onClick={onIncrementAsync}>Increment async</button>
  </p>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  onIncrementIfOdd: PropTypes.func.isRequired,
};

const counterStateToProps = state => ({
  value: state.counter.state,
});

const counterDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(CounterActions.increment()),
  onDecrement: () => dispatch(CounterActions.decrement()),
  onIncrementIfOdd: () => dispatch(CounterActions.incrementIfOdd()),
  onIncrementAsync: () => dispatch(CounterActions.incrementAsync()),
});

export default connect(counterStateToProps, counterDispatchToProps)(Counter);
