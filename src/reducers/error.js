import { RECIEVE_ISSUES, RECIEVE_REPOS, FETCH_REPOS_FAILURE, FETCH_ISSUES_FAILURE } from '../actions/index';

export default (state = '', action) => {
  switch (action.type) {
    case RECIEVE_ISSUES:
    case RECIEVE_REPOS:
      return '';
    case FETCH_REPOS_FAILURE:
    case FETCH_ISSUES_FAILURE:
      return action.message;
    default:
      return state;
  };
  return state;
};
