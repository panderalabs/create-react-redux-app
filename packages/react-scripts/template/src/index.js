import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import Routes from './Routes';
import initInterceptor from './utils/httpInterceptor';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

initInterceptor();

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} routes={Routes(store)} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
