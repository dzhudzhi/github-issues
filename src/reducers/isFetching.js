import { REQUEST_ISSUES, RECIEVE_ISSUES, REQUEST_REPOS, RECIEVE_REPOS, FETCH_REPOS_FAILURE } from '../actions/index';

export default (state = false, action) => {
  switch (action.type) {
    case REQUEST_ISSUES:
    case REQUEST_REPOS:
      return true;
    case RECIEVE_ISSUES:
    case RECIEVE_REPOS:
    case FETCH_REPOS_FAILURE:
      return false;
    default:
      return state;
  };
  return state;
};
