import { 
  OPEN_DIALOG,
  CLOSE_DIALOG,
  DIALOG_TYPE
} from '../constants/DialogTypes';
import createReducer from 'client/reducers/createReducer';

const initialState = {
  open: false,
  type: DIALOG_TYPE.DIALOG,
  props: {},
};

export default createReducer(initialState, {
  [OPEN_DIALOG](state, action) {
    return {
      open: true,
      type: action.payload.type,
      props: action.payload.props
    };
  },

 [CLOSE_DIALOG](state, action) {
    return {
      open: false,
    };
  },
});

export function getDialog(state) {
  return state.dialog;
}
