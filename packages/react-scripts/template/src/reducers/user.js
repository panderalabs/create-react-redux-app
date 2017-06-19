import {
  AUTH_LOGGED_IN_HIT,
  AUTH_LOGOUT,
  EXCHANGE_TOKEN_SUCCESS,
  EXCHANGE_TOKEN_FAILURE,
} from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  token: null,
};

function user(state = initialState, { type, payload }) {
  // eslint-disable-line
  switch (type) {
    case EXCHANGE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        token: payload.token,
      });
    case EXCHANGE_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
      });
    case AUTH_LOGGED_IN_HIT: {
      return Object.assign({}, state, {
        isAuthenticated: true,
        token: payload.query.token,
      });
    }
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
      });
    default:
      return state;
  }
}

export default user;
