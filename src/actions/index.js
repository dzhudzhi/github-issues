import axios from 'axios';
import parse from 'parse-link-header';

export const SET_NAME_REPO = 'SET_NAME_REPO';
export const SET_PAGER = 'SET_PAGER';
export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECIEVE_REPOS = 'RECIEVE_REPOS';
export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_ISSUES = 'FETCH_ISSUES';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export const FETCH_ISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';
export const REMOVE_ISSUES = 'REMOVE_ISSUES';
export const REQUEST_ISSUES = 'REQUEST_ISSUES';
export const RECIEVE_ISSUES = 'RECIEVE_ISSUES';

const setNameRepo = (name_repo) => ({
  type: SET_NAME_REPO,
  payload: name_repo
});

const setLastPage = (response, per_page) => (dispatch) => {
  const { link } = response.headers;
  const last_page = !link ? 1 : parseInt(parse(link).last.page);

  dispatch(setPager({ page: undefined, per_page, last_page }));
};

const setPager = ({page = 1, per_page = 30, last_page = 1}) => ({
  type: SET_PAGER,
  payload: {page, per_page, last_page}
});

const recieveRepos = (response) => ({
  type: RECIEVE_REPOS,
  payload: response
});

export const fetchRepos = (name) => (dispatch) => {
  dispatch({
    type: REQUEST_REPOS
  });

  const url = `https://api.github.com/users/${name}/repos`;

  return axios.get(url).then(
    response => {
      dispatch(setNameRepo({ name, repo: '' }));
      if (response.data.length) {
        dispatch({
          type: RECIEVE_REPOS,
          payload: response
        });
      } else {
        dispatch({
          type: FETCH_REPOS_FAILURE,
          message: `No repos found for user "${name}"`
        })
      };
    })
    .catch(error => {
      dispatch({
        type: FETCH_REPOS_FAILURE,
        message: `User "${name}" not found.`
      });
    });
};

export const fetchIssues = (name, repo, page = 1, per_page = 30) => (dispatch) => {
  dispatch({
    type: REMOVE_ISSUES
  });
  dispatch({
    type: REQUEST_ISSUES
  });
  const url = `https://api.github.com/repos/${name}/${repo}/issues?page=${page}&per_page=${per_page}`;
  return axios.get(url)
    .then(response => {
        const { link } = response.headers;
        let last_page = page;
        if (!!link) {
          last_page = !parse(link).last ? page : parseInt(parse(link).last.page);
        }
        dispatch(setPager({ page, per_page, last_page }));
        dispatch(setNameRepo({ name, repo }));
        dispatch({
          type: RECIEVE_ISSUES,
          payload: response
        });
        if (response.data.length) {
          dispatch({
            type: RECIEVE_ISSUES,
            payload: response
          });
        } else {
          dispatch({
            type: FETCH_ISSUES_FAILURE,
            message: `No issues found for repo "${name}/${repo}"`
          })
        };
    })
};
