import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App.js';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
// console.log('environment is', process.env.NODE_ENV);
