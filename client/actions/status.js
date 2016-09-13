import { 
  START_PROGRESS,
  END_PROGRESS,
} from '../constants/StatusActionTypes';
import createAction from 'client/actions/createAction';

export const startProgress = createAction(START_PROGRESS, props => 
  props
);

export const endProgress = createAction(END_PROGRESS, props => 
  props
);
