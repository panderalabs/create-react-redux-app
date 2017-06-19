import { push } from 'react-router-redux';
import * as authApi from './api/auth';

export const AUTH_LOGGED_IN_HIT = 'AUTH_LOGGED_IN_HIT';
export function authLoggedInHit(location) {
  return {
    type: AUTH_LOGGED_IN_HIT,
    payload: location,
  };
}

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function onLoggedInRoute(location) {
  return dispatch => {
    dispatch(authLoggedInHit(location));
    setTimeout(dispatch.bind(null, push('/')), 500); // Wait until we've handled/persisted auth info
  };
}

export function reauthenticate() {
  return dispatch => {
    dispatch(logout());
    return setTimeout(
      window.location.replace.bind(
        null,
        process.env.REACT_APP_AUTH_URL || '/auth'
      ),
      500
    );
  };
}

export const EXCHANGE_TOKEN_SUCCESS = 'EXCHANGE_TOKEN_SUCCESS';
function exchangeTokenSuccess(response) {
  return {
    type: EXCHANGE_TOKEN_SUCCESS,
    payload: response,
  };
}

export const EXCHANGE_TOKEN_FAILURE = 'EXCHANGE_TOKEN_FAILURE';
function exchangeTokenFailure(err) {
  return {
    type: EXCHANGE_TOKEN_FAILURE,
    payload: err,
  };
}

export function exchangeToken() {
  return (dispatch, getState) => authApi
    .exchangeToken({
      providerUrl: getState().config.authApiUrl,
    })
    .then(response => dispatch(exchangeTokenSuccess(response)))
    .catch(err => {
      dispatch(push('/login'));
      dispatch(exchangeTokenFailure(err));
    });
}
