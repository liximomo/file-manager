import { 
  FETCH_BASE_PATH
} from '../constants/MetaActionTypes';
import createReducer from 'client/reducers/createReducer';
import { pageName } from '../index';

const initialState = {
  basePath: undefined,
};

export default createReducer(initialState, {
  [FETCH_BASE_PATH](state, action) {
    return {
      ...state,
      basePath: action.payload.data
    };
  },

});

export function getMeta(state) {
  return state[pageName].meta;
}
