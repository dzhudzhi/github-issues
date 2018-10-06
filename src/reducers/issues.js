import { RECIEVE_ISSUES, REMOVE_ISSUES, FETCH_REPOS_FAILURE } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_ISSUES:
      return action.payload.data;
    case REMOVE_ISSUES:
    case FETCH_REPOS_FAILURE:
      return [];
  };
  return state;
};
