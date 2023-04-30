import React from 'react';
import { renderRoutes } from 'react-router-config';

import Header from './components/Header';
import { fetchCurrentUser } from './actions';

function App(props) {
  return (
    <div className="app">
      <Header />
      {renderRoutes(props.route.routes)}
    </div>
  );
}

function loadData(store) {
  return store.dispatch(fetchCurrentUser());
}

export default {
  component: App,
  loadData,
};
