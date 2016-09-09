import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import history from '../history/history';
import createReducer from '../reducers';

let enhancers = [applyMiddleware(thunk, api)];

if (process.env.PLANTFORM === 'web') {
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : noop => noop);
}

export default function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, compose(...enhancers));
  store.asyncReducers = {};
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}