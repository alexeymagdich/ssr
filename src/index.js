import 'babel-polyfill';

import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';

import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // Only for course purposes (never mind)
    proxyReqOptDecorator: (opts) => {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  })
);
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  const componentsToRender = matchRoutes(Routes, req.path);
  const loadDataFunctions = componentsToRender
    .map(utilities.mapCompToLoadData)
    .filter(utilities.onlyExisting)
    .map((func) => func(store));

  Promise.allSettled(loadDataFunctions).then(() => {
    const context = {};
    const html = renderer(req, store, context);

    if (context.url) {
      return res.redirect(303, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(html);
  });
});

const utilities = {
  mapCompToLoadData: (comp) => {
    const load = comp.route.loadData;
    if (!load) {
      return null;
    }

    return load;
  },
  onlyExisting: (something) => !!something,
};

app.listen(3000, () => {
  console.log('Listening on 3000...');
});
