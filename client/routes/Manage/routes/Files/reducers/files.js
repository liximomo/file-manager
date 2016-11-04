import { 
  FETCH_FILES,
  CREATE_FOLDER,
  UPLOAD_FILE,
  RENAME_FILE,
  CHECK_FILE,
  TOGGLE_CHECK,
} from '../constants/FileActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  checkable: false,
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

  [RENAME_FILE](state, action) {
    const cur = state.curDir;
    const nameInfo = action.meta;
    const newCur = {
      ...cur,
      children: cur.children.map(file =>
        file.fullname === nameInfo.oriName
          ? {
            ...file,
            ...action.payload
          }
          : file
      )
    }
    return {
      ...state,
      curDir: newCur
    };
  },

  [CHECK_FILE](state, action) {
    const cur = state.curDir;
    const { name, checked } = action.payload;
    const newCur = {
      ...cur,
      children: cur.children.map(file =>
        file.fullname === name
          ? {
            ...file,
            checked,
          }
          : file
      )
    }
    return {
      ...state,
      curDir: newCur
    };
  },

  [TOGGLE_CHECK](state, action) {
    return {
      ...state,
      checkable: action.payload
    };
  },
  
});

export function getCurDirInfo(state) {
  return {
    checkable: state[pageName].files.checkable,
    dirInfo: state[pageName].files.curDir
  };
}
