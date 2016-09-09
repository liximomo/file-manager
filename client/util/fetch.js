import 'isomorphic-fetch';
import { getBase } from './url';

const baseurl = getBase();

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded'
});

const defaultOption = {
  headers,
  credentials: 'include',
};

function _fetch(url, option) {
  let _option = {...defaultOption, ...option};
  let fullurl = url.indexOf('http://') === 0 ? url : `${baseurl}/${url}`;
  return fetch(fullurl, _option);
}

function params(obj) {
  return Object.keys(obj)
    .filter(key => obj[key])
    .map(key =>
    `${key}=${encodeURIComponent(obj[key])}`
  ).join('&');
}

export default _fetch;

export { params };
