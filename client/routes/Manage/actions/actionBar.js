import { SET_ACTIONBAR_RIGHT_MENU } from '../constants/ActionBarActionTypes';
import createAction from 'client/actions/createAction';

export const setAactionBarRMenu = createAction(SET_ACTIONBAR_RIGHT_MENU, node => 
  node
);
