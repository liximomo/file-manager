import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import createReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, applyMiddleware(thunk, api));
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}