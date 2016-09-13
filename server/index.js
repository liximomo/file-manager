import './util/client-env';
import Express from 'express';
import path from 'path';
import fs from 'fs';
import varConfig from '../configs/config';
import config from './config';
import router from './controllers/assets';
import fileRouter from './controllers/file';
import { errorPage } from './controllers/errors';
import reactServerRender from './reactServerRender';


// Initialize the Express App
const app = new Express();
app.set('views', path.resolve(varConfig.projectPath, './views'));
app.set('view engine', 'pug');

function apiErrorHandler(err, req, res, next) {
  let error = { 
    trace: err.stack,
    error: true, 
    message: err.message
  };
  return res.send(error);
}

// api 路由
app.use('/api', router);
app.use('/api', fileRouter);
app.use('/api', apiErrorHandler);



// 静态 host
app.use(varConfig.publicPath, Express.static(varConfig.distPath));

// 静态页面
// app.use((req, res) => {
//   res.render('manager/index', { title: 'hello world!'});
// });
app.use(reactServerRender);

// 错误页面
app.use(errorPage);

app.listen(config.port, config.host, (error) => {
  if (error) {
    throw error;
  }

  console.log(`app is running on ${config.host}:${config.port}`);
});