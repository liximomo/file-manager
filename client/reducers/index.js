import { combineReducers } from 'redux';
import pending from './pending';

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    pending,
    ...asyncReducers
  });
}