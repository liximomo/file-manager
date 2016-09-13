import { 
  FETCH_FILES,
  CREATE_FOLDER,
  UPLOAD_FILE,
} from '../constants/FileActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  basePath: undefined,
  curDir: {
    children: [],
  }
};

export default createReducer(initialState, {
  [FETCH_FILES](state, action) {
    return {
      ...state,
      curDir: action.payload
    };
  },

  [CREATE_FOLDER](state, action) {
    const cur = state.curDir;
    const newCur = {
      ...cur,
      children: cur.children.concat(action.payload)
    }
    return {
      ...state,
      curDir: newCur
    };
  },

  [UPLOAD_FILE](state, action) {
    const cur = state.curDir;
    const newCur = {
      ...cur,
      children: cur.children.concat(action.payload)
    }
    return {
      ...state,
      curDir: newCur
    };
  },
});

export function getCurDirInfo(state) {
  return state[pageName].files.curDir;
}
