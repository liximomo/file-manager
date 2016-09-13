import { 
  START_PROGRESS,
  END_PROGRESS,
} from '../constants/StatusActionTypes';
import createReducer from 'client/reducers/createReducer';

const initialState = {
  progress: {
    show: false,
  },
};

export default createReducer(initialState, {
  [START_PROGRESS](state, action) {
    return {
      ...state,
      progress: {
        show: true
      },
    };
  },

 [END_PROGRESS](state, action) {
    return {
      ...state,
      progress: {
        show: false
      },
    };
  },
});

export function getStatus(state) {
  return state.status;
}
