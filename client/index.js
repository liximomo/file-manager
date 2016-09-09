import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import createRoute from 'client/route';
import history from 'client/history/history';
import configureStore from 'client/store';
import createReducer from 'client/reducers';
// import isEqual from 'lodash/isEqual';
// import Test from 'client/components/Test';

// const rootReducer = createReducer();
// const defaultState = rootReducer(undefined, { type: '@@null' });

// const initState = defaultState.merge(customState);

const store = configureStore(window.__INITIAL_STATE__);

const routes = createRoute(store);

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('root')
  );
});
