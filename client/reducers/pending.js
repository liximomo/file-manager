import { checkPendingActionType } from '../middleware/api';

const initialState = {};

export default function pending(state = initialState, action) {
  return checkPendingActionType(action)
    ? Object.assign({}, state, {
        [action.meta.pending.desc]: action.meta.pending.status,
      })
    : state;
}
