import React from 'react';
import { connect } from 'react-redux';
import { fetchIssues, fetchRepos } from '../actions/index';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: ''
    };
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onNameTyped = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (name === '') {
      this.setState(() => ({ error: 'Please provide Username.' }));
    } else {
      this.setState(() => ({ error: '', name: ''}));
      this.props.fetchRepos(name);
    }
  };
  onRepoSelected = (e) => {
    const { name } = this.props.name_repo;
    const repo = e.target.value;
    const { page, per_page } = this.props.pager;
    this.setState(() => ({ repo }));
    this.props.fetchIssues(name, repo, page, per_page);
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <form onSubmit={this.onNameTyped}>
              <input
                type="text"
                className="text-input"
                placeholder="Username"
                autoFocus
                value={this.state.name}
                onChange={this.onNameChange}
              />
              <button className="button">Search</button>
            </form>
          </div>

          {this.props.repos.length > 0 &&
            <div className="input-group__item">
              <div className="select">
                {`${this.props.name_repo.name} /`}
              </div>
            </div>
          }
          {this.props.repos.length > 0 &&
            <div className="input-group__item">
              <select
                className="select"
                value={this.props.name_repo.repo}
                onChange={this.onRepoSelected}
              >
                {this.props.name_repo.repo === '' && <option>--- choose repo ---</option>}
                {
                  this.props.repos.map((repo) => (
                    <option key={repo.id} value={repo.name}>
                      {repo.name}
                    </option>))
                }
              </select>
            </div>
          }
        </div>
        {this.props.isFetching && <p>Loading...</p>}
      </div>
    );

  }
}

const mapStateToProps = ({ name_repo, repos, isFetching, pager }) => ({ name_repo, repos, isFetching, pager });

const mapDispatchToProps = (dispatch) => ({
  fetchIssues: (name, repo, page, per_page) => dispatch(fetchIssues(name, repo, page, per_page)),
  fetchRepos: (name) => dispatch(fetchRepos(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
