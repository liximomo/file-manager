import { combineReducers } from 'redux';
import meta from './meta';
import actionBar from './actionBar';

const rootReducer = combineReducers({
  meta,
  actionBar,
});

export default rootReducer;
