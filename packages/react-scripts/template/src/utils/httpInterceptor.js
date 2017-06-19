import fetchIntercept from 'fetch-intercept';
import { API_BASE_URL } from '../constants/appConstants';
import { get } from './localstore';

function getJsonConfig(config) {
  config.headers = Object.assign(
    {},
    {
      'Content-Type': 'application/json',
    },
    config.headers
  );
  if (config.body) config.body = JSON.stringify(config.body);
  return config;
}

export default () => fetchIntercept.register({
  request(url, config = {}) {
    let endpoint = url;
    if (!/https?:\/\//.test(url)) {
      endpoint = API_BASE_URL + endpoint;
    }
    const token = config.token || get('token');
    const formData = config.body && config.body.constructor.name === 'FormData';

    const baseHeaders = {
      Authorization: token && `Bearer ${token}`,
      Accept: 'application/json',
    };

    config.headers = Object.assign({}, baseHeaders, config.headers);
    if (!formData) {
      return [endpoint, getJsonConfig(config)];
    }
    return [endpoint, config];
  },
  response(response) {
    if (!response.ok) {
      const err = new Error(response.statusText);
      err.code = response.status;
      err.message = response.statusText;

      throw err;
    }
    const type = response.headers.get('content-type');
    if (/application\/json/.test(type)) {
      return response.json();
    }
    return response.text();
  },
});
