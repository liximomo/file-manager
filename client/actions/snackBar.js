import { 
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from '../constants/SnackBarActionTypes';
import createAction from 'client/actions/createAction';

export const openSnackBar = createAction(OPEN_SNACKBAR, props => 
  props
);

export const closeSnackBar = createAction(CLOSE_SNACKBAR, props => 
  props
);
