import { RECIEVE_REPOS, FETCH_REPOS_FAILURE  } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_REPOS:
      return [ ...action.payload.data ];
      case FETCH_REPOS_FAILURE:
        return [];
  };
  return state;
};
