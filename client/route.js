import App from './App';
import Manage from './routes/Manage';

const pageName = 'root'; // html 页面输出变量
const path = '/';
const fullpath = '';

const createRoute = store => ({
  path: path,
  // indexRoute: { onEnter: (nextState, replace) => replace('/gaoshou/liveroom') },
  component: App,
  childRoutes: [
    Manage(store),
  ]
});

export default createRoute;

export { pageName, fullpath };