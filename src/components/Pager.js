import React from 'react';
import { connect } from 'react-redux';
import { fetchIssues } from '../actions/index';

export class Pager extends React.Component {
  constructor(props) {
    super(props);

    const { per_page } = this.props.pager;
    this.state = {
      per_page
    };
  };
  onPrevClick = () => {
    let { page, per_page } = this.props.pager;
    const { name, repo } = this.props.name_repo;
    page === 1 ? page = 1 : page--;
    this.props.fetchIssues(name, repo, page, per_page);
  };
  onNextClick = () => {
    let { page, per_page } = this.props.pager;
    const { name, repo } = this.props.name_repo;
    page++;
    this.props.fetchIssues(name, repo, page, per_page);
  };
  onPerPageChange = (e) => {
    const { value } = e.target;
    if (value > 0 && value <= 100) {
      this.setState({ per_page: e.target.value })
    }

  };
  onSetClick = () => {
    const { page, per_page } = this.state;
    const { name, repo } = this.props.name_repo;
    this.props.fetchIssues(name, repo, undefined, per_page);
  };
  render() {
    const { page, last_page } = this.props.pager;

    return (
      <div className="content-container">
        <div className="pager">
          <div className="pager__item">
            <button className="button" onClick={this.onPrevClick} disabled={page === 1}>Prev</button>
            <input
              type="text"
              className="text-input pager-input"
              disabled="true"
              value={page}
            />
            <button className="button" onClick={this.onNextClick} disabled={page === last_page}>Next</button>
          </div>
          <div className="pager__item">
            <input
              className="text-input pager-input"
              type="number"
              value={this.state.per_page}
              onChange={this.onPerPageChange}
            />
            <button className="button" onClick={this.onSetClick}>Set</button>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = ({ name_repo, pager }) => {
  return (
    { name_repo, pager }
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchIssues: (name, repo, page, per_page) => dispatch(fetchIssues(name, repo, page, per_page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
