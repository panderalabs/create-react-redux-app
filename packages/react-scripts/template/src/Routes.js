import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './pages/layout/Layout';
import Root from './pages/root/Root';
import { onLoggedInRoute } from './actions/auth';

export default function Routes(store) {
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Root} />
      <Route
        path="authenticated"
        onEnter={nextState =>
          store.dispatch(onLoggedInRoute(nextState.location))}
      />
    </Route>
  );
}
