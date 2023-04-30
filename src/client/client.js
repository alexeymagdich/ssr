// Startup point for the client-side app

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import rootReducer from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api',
});

const store = createStore(rootReducer, window.INITIAL_STATE, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

import Routes from './Routes';

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
