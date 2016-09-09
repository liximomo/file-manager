import configureStore from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import match from 'react-router/lib/match'; 
import fetchData from './util/fetchData';
import createRoute from '../client/route';

const store = configureStore();
const routes = createRoute(store);

// Server Side Rendering based on routes matched by React-router.
export default function reactServerRender(req, res, next) {
  console.log('server render');
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      next(err);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    return fetchData(store, renderProps.components, renderProps.location)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
              <RouterContext {...renderProps} />
          </Provider>
        );

        const state = store.getState();

        res.render('manager/index', {
          NODE_ENV: process.env.NODE_ENV,
          title: 'hello world!',
          content: initialView,
          initialState: JSON.stringify(state),
        });
      })
      .catch((error) => next(error));
  });
}
