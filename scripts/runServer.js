import cp from 'child_process';
import path from 'path';
import webpackConfig from '../configs';
import config from '../server/config';

let server;
const { output } = webpackConfig.server;
const serverPath = path.join(output.path, output.filename);

const RUNNING_REGEXP = /app is running on/;

// Launch or restart the Node.js server
function runServer(cb) {
  let cbIsPending = !!cb;

  function onStdOut(data) {
    const time = new Date().toTimeString();
    const match = data.toString('utf8').match(RUNNING_REGEXP);

    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);

    if (match) {
      server.stdout.removeListener('data', onStdOut);
      server.stdout.on('data', x => process.stdout.write(x));
      if (cb) {
        cbIsPending = false;
        cb(null, `${config.host}:${config.port}`);
      }
    }
  }

  if (server) {
    server.kill('SIGTERM');
  }

  server = cp.spawn('node', [serverPath, '--basePath=/Users/mymomo/test'], {
    env: Object.assign({ NODE_ENV: 'development' }, process.env),
    silent: false,
  });
  if (cbIsPending) {
    server.once('exit', (code, signal) => {
      if (cbIsPending) {
        throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
      }
    });
  }

  server.stdout.on('data', onStdOut);
  server.stderr.on('data', x => process.stderr.write(x));
  return server;
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;
