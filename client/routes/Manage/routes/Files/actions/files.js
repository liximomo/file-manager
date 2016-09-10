import { 
  FETCH_FILES,
} from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const fetchDirFiles = createAction(FETCH_FILES, filename => 
  fetch(`files/${encodeURIComponent(filename)}?children`)
);
