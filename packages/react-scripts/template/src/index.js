import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
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
    <Routes store={store} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
