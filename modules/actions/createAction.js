export function unFlat(...argNames) {
  return function(...args) {
    let action = {};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    })
    return action;
  }
}

export function createAction(type, payloadCreator = a => a) {
  return function(...args) {
    let action = {
      type,
      payload: payloadCreator(...args)
    }
    return action;
  }
}