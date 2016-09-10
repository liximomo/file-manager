import { SET_ACTIONBAR_RIGHT_MENU } from '../constants/ActionBarActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  rightMenu: undefined,
};

export default createReducer(initialState, {
  [SET_ACTIONBAR_RIGHT_MENU](state, action) {
    return {
      ...state,
      rightMenu: action.payload,
    };
  },
});

export function getMenu(state) {
  const { rightMenu } = state[pageName].actionBar;
  return {
    rightMenu,
  };
}
