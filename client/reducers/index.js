import { combineReducers } from 'redux';
import dialog from './dialog';
import snackBar from './snackBar';
import pending from './pending';
import status from './status';

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    status,
    dialog,
    snackBar,
    pending,
    ...asyncReducers
  });
}