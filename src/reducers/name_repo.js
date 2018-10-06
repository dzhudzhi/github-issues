import { SET_NAME_REPO, SET_REPO, FETCH_REPOS_FAILURE } from '../actions/index';

export default (state = { name: '', repo: '' }, action) => {
  switch (action.type) {
    case SET_NAME_REPO:
      return action.payload;
    case FETCH_REPOS_FAILURE:
      return { name: '', repo: '' };
  };
  return state;
};
