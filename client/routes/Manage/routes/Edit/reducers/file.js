import { FETCH_FILE_CONTENT } from '../constants/FileActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  ext: undefined,
  content: '',
};

export default createReducer(initialState, {
  [FETCH_FILE_CONTENT](state, action) {
    console.log('FETCH_FILE_CONTENT');
    return {
      ext: action.payload.ext,
      content: action.payload.content
    };
  },
});

export function getFileContent(state) {
  return state[pageName].file;
}
