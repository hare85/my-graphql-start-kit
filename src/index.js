import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import createStore from './redux';
import './index.css';

const store = createStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
