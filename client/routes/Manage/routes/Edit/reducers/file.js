import {
  FETCH_FILE_CONTENT,
  EDITOR_SAVE_FILE_CONTENT
} from '../constants/FileActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  name: undefined,
  fullname: undefined,
  ext: undefined,
  content: '',
};

export default createReducer(initialState, {
  [FETCH_FILE_CONTENT](state, action) {
    return {
      name: action.payload.name,
      fullname: action.payload.fullname,
      ext: action.payload.ext,
      content: action.payload.content
    };
  },

  [EDITOR_SAVE_FILE_CONTENT](state, action) {
    return state;
  }
});

export function getFileContent(state) {
  return state[pageName].file;
}
