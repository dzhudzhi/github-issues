import { SET_PAGER } from '../actions/index';

export default (state = {page: 1, per_page: 30, last_page: 1}, action) => {
  switch (action.type) {
    case SET_PAGER:
      return {...state, ...action.payload};
  };
  return state;
};
