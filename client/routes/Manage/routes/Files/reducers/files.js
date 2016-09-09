import { 
  FETCH_FILES,
  FETCH_BASE_PATH
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

  [FETCH_BASE_PATH](state, action) {
    return {
      ...state,
      basePath: action.payload.data
    };
  },

});

export function getCurDirInfo(state) {
  return state[pageName].files.curDir;
}

export function getBasePath(state) {
  return state[pageName].files.basePath;
}
