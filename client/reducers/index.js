import { combineReducers } from 'redux';
import snackBar from './snackBar';
import pending from './pending';
import status from './status';

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    status,
    snackBar,
    pending,
    ...asyncReducers
  });
}