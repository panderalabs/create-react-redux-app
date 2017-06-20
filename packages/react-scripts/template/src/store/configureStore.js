import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import * as localstore from '../utils/localstore';

function saveAuthToken(token) {
  if (token) {
    localstore.set('token', token);
  } else {
    localstore.remove('token');
  }
}

export default function configureStore(history, initialState = {}) {
  const token = localstore.get('token');

  if (token) {
    initialState.user = {
      isAuthenticated: true,
      token,
    };
  }
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        {
          // Specify here name, actionsBlacklist, actionsCreators and other options
        }
      )
    : compose;
  /* eslint-enable */

  const enhancers = composeEnhancers(
    applyMiddleware(thunkMiddleware, routerMiddleware(history))
  );
  const store = createStore(reducers, initialState, enhancers);

  store.subscribe(() => {
    saveAuthToken(store.getState().user.token);
  });

  return store;
}
