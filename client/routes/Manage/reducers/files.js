import { FETCH_FILES } from '../constants/FileActionTypes';
import createReducer from 'client/reducers/createReducer';

const initialState = {
  basePath: '',
  files: [],
};

export default createReducer(initialState, {
  [FETCH_FILES](state, action) {
    return {
      ...state,
      files: action.payload,
    };
  },

});
