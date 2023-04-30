import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import rootReducer from '../client/reducers';

export default function createStore(req) {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' },
  });

  const store = createReduxStore(rootReducer, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  return store;
}
