import { 
  FETCH_FILES,
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

});

export function getCurDirInfo(state) {
  return state[pageName].files.curDir;
}
