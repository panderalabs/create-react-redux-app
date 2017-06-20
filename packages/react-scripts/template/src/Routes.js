import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Root from './pages/root/Root';
import { onLoggedInRoute } from './actions/auth';

export default function Routes(props) {
  return (
    <Layout>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Root} />
          <Route
            path="authenticated"
            onEnter={nextState =>
              props.store.dispatch(onLoggedInRoute(nextState.location))}
          />
        </div>
      </BrowserRouter>
    </Layout>
  );
}

Routes.propTypes = {
  store: PropTypes.any,
};
