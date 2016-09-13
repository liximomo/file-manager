import { SET_ACTIONBAR_ELEMENT } from '../constants/ActionBarActionTypes';
import createAction from 'client/actions/createAction';

export const setAactionBar = createAction(SET_ACTIONBAR_ELEMENT, (props = {}) => 
  props
);
