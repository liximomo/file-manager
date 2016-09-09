function isPromise(val) {
  return val && typeof val.then === 'function';
}

function fulfillPromise(promise) {

  return promise
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    });
}

const PENDING = '@@pending';

function pendingActionType(desc) {
  return `${PENDING}/${desc}`;
}

function checkPendingActionType(action) {
  return action.meta && action.meta.pending !== undefined;
}

export default function promiseMiddleware(store) {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    function actionWith(data, meta) {
      // eslint-disable-next-line eqeqeq
      const preMeta = action.meta != undefined ? action.meta : {};
      if (meta) {
        const nextMeta = Object.assign({}, preMeta, meta);
        return Object.assign({}, action, data, { meta: nextMeta });
      }

      return Object.assign({}, action, data);
    }

    const pending = action.meta && action.meta.pending;

    let pendingMeta = {};

    // eslint-disable-next-line eqeqeq
    if (pending != undefined) {
      next(actionWith({ type: pendingActionType(pending) }, 
        { pending: { desc: pending, status: true } }
      ));

      pendingMeta = { pending: { desc: pending, status: false } };
    }

    return fulfillPromise(action.payload)
      .then(
        response => {
          // if (response.code !== 200) {
          //   return next(actionWith({ payload: response, fail: true }, pendingMeta));
          // }
          
          return next(actionWith({ payload: response }, pendingMeta));
        },
        error =>
          next(actionWith({ payload: error, error: true }, pendingMeta))
      );
  }
};

export { checkPendingActionType };
