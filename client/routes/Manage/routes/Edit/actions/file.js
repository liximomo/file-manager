import { FETCH_FILE_CONTENT } from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const fetchFileContent = createAction(FETCH_FILE_CONTENT, filename => 
  fetch(`files/${encodeURIComponent(filename)}?format=text`)
);
