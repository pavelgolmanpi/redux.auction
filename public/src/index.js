import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes  />
  </Provider>,
  document.getElementById('root')
);

//PS: You need to create and export this "container component" in src to work ok?
