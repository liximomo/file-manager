import { 
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from '../constants/SnackBarActionTypes';
import createReducer from 'client/reducers/createReducer';

const initialState = {
  open: false,
  message: '',
};

export default createReducer(initialState, {
  [OPEN_SNACKBAR](state, action) {
    return {
      ...action.payload,
      open: true,
    };
  },

 [CLOSE_SNACKBAR](state, action) {
    return {
      ...action.payload,
      open: false,
    };
  },
});

export function getSnackBar(state) {
  return state.snackBar;
}
