import { 
  FETCH_BASE_PATH
} from '../constants/MetaActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const fetchBasePath = createAction(FETCH_BASE_PATH, file => 
  fetch(`basePath`)
);
