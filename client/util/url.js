import config from 'server/config';

export function getBase() {
  let baseurl;

  if (process.env.NODE_ENV === 'production') {
    baseurl = `http://192.168.50.195:${config.port}/api`;
  } else {
    // baseurl = 'http://api.y.dev.lanyi99.cn/v1';
  
    baseurl = `http://localhost:${config.devPort}/api`;
  }
  return baseurl;
}

export function join(url) {
  return `${getBase()}/${url}`;
}