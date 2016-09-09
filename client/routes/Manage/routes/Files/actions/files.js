import { 
  FETCH_FILES,
  FETCH_BASE_PATH
} from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const fetchDirFiles = createAction(FETCH_FILES, filename => 
  fetch(`files/${encodeURIComponent(filename)}?children`)
);


export const fetchBasePath = createAction(FETCH_BASE_PATH, file => 
  fetch(`basePath`)
);