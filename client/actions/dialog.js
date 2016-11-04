import { 
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from '../constants/DialogTypes';
import createAction from 'client/actions/createAction';

export const openDialog = createAction(OPEN_DIALOG, unFlat(type, props));

export const closeDialog = createAction(CLOSE_DIALOG);
