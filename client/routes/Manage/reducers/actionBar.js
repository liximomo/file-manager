import { SET_ACTIONBAR_ELEMENT } from '../constants/ActionBarActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
};

export default createReducer(initialState, {
  [SET_ACTIONBAR_ELEMENT](state, action) {
    return action.payload;
  },
});

export function getActionBarProps(state) {
  return state[pageName].actionBar
}
