import { combineReducers } from 'redux';
import snackBar from './snackBar';
import pending from './pending';


export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    snackBar,
    pending,
    ...asyncReducers
  });
}