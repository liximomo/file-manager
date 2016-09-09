import { FETCH_FILES } from '../constants/FileActionTypes';
import createAction from 'client/actions/createAction';
import fetch from 'client/util/fetch';

export const getFiles = createAction(FETCH_FILES, file => 
  fetch(`directory/${file}/files`)
);
