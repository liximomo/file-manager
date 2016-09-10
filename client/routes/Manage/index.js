import Files from './routes/Files';
import Edit from './routes/Edit';
import { injectAsyncReducer } from 'client/store';
import { fullpath as parentPath } from '../../route';

const pageName = 'manage';
const path = 'manage'
const fullpath = `${parentPath}/manage`;

const createRoute = store => ({
  path: path,
  getComponent(nextState, cb) {
    const reducers = require('./reducers').default;
    injectAsyncReducer(store, pageName, reducers);

    if (process.env.PLANTFORM === 'node') {
      cb(null, require('./views/Manage').default);
    } else {
      require.ensure([], require => {
        cb(null, require('./views/Manage').default);
      }, 'manage');
    }
  },
  childRoutes: [
    Files(store),
    Edit(store),
  ],
});

export default createRoute;

export { pageName, fullpath };