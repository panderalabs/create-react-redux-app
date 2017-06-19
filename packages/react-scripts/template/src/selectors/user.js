import { createSelector } from 'reselect';

// To use the selector in the code
//
// import { * as fromUser };
//
// const token = fromUser.selectToken(state);
//

// This is a bit superfluous, but sets the example for how to use selectors
export const selectToken = createSelector(
  [state => state.user.token],
  token => token
);
