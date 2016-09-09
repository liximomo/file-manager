import { injectAsyncReducer } from 'client/store';
import { fullpath as parentPath } from '../../index';

const pageName = 'edit';
const path = 'edit'
const fullpath = `${parentPath}/edit`;

const createRoute = store => ({
  path: path,
  getComponent(nextState, cb) {
    const reducers = require('./reducers').default;
    injectAsyncReducer(store, pageName, reducers);

    if (process.env.PLANTFORM === 'node') {
      cb(null, require('./views/FileEditor').default);
    } else {
      require.ensure([], require => {
        cb(null, require('./views/FileEditor').default);
      }, 'manage/edit');
    }
  },
});

export default createRoute;

export { pageName, fullpath };