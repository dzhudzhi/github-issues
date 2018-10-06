import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import issuesReducer from '../reducers/issues';
import reposReducer from '../reducers/repos';
import name_repoReducer from '../reducers/name_repo';
import pagerReducer from '../reducers/pager';
import isFetching from '../reducers/isFetching';
import error from '../reducers/error';

export default () => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleWare(
    combineReducers({
      issues: issuesReducer,
      repos: reposReducer,
      name_repo: name_repoReducer,
      pager: pagerReducer,
      isFetching,
      error
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
