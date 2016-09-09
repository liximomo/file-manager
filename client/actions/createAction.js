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
    const action = {
      type,
      payload: payloadCreator(...args)
    };
    if (typeof metaCreator === 'function') {
      action.meta = metaCreator(...args);
    }
    return action;
  };
}