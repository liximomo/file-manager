export function unFlat(...argNames) {
  return function(...args) {
    let action = {};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    })
    return action;
  }
}

export default function createAction(type, payloadCreator = a => a, metaCreator) {
  return (...args) => {
    const hasError = args[0] instanceof Error;

    const action = {
      type,
      payload: hasError ? args[0] : payloadCreator(...args)
    };

    if (hasError) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true;
    }
    
    if (typeof metaCreator === 'function') {
      action.meta = metaCreator(...args);
    }
    return action;
  };
}