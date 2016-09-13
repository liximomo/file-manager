export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      if(action.error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('action error:', action);
        }
        return {
          ...state,
          error: action.payload
        };
      }
      if(action.fail) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('action fail:', action);
        }
        return {
          ...state,
          fail: action.payload
        };
      }
      return handlers[action.type](state, action);
    }
    return state;
  };
}
