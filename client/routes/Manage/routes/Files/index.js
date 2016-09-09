import { injectAsyncReducer } from 'client/store';
import { fullpath as parentPath } from '../../index';

const pageName = 'files';
const path = 'files'
const fullpath = `${parentPath}/files`;

const createRoute = store => ({
  path: path,
  getComponent(nextState, cb) {
    const reducers = require('./reducers').default;
    injectAsyncReducer(store, pageName, reducers);

    if (process.env.PLANTFORM === 'node') {
      cb(null, require('./views/FileListView').default);
    } else {
      require.ensure([], require => {
        cb(null, require('./views/FileListView').default);
      }, 'manage/files');
    }
  },
});

export default createRoute;

export { pageName, fullpath };