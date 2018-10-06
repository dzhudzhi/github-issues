import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Pager from './pager';

export class IssuesList extends React.Component {
  renderIssue(issueData) {
    return (
      <Link
        className="list-item"
        key={issueData.id}
        to={`/issue/${issueData.id}`}
        >
          <div>
            <h3 className="list-item__title">{issueData.title}</h3>
            <span className="list-item__sub-title">{moment(issueData.created_at).format('DD MMM YYYY')}</span>
          </div>
          <h3 className="list-item__data">#{issueData.number}</h3>
      </Link>
    );
  };

  render() {
    const { issues, isFetching, name_repo } = this.props;
    return (
      <div>
        {issues.length > 0 && <Pager />}
        <div className="content-container">
          <div className="list-body">
            {issues.length > 0 &&
              <div className="list-header">
                <div className="show-for-mobile">Issues</div>
                <div className="show-for-desktop">Issue</div>
                <div className="show-for-desktop">Number</div>
              </div>}
            {issues.length > 0 && issues.map(this.renderIssue)}
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = ({ issues, isFetching, name_repo }) => ({ issues, isFetching, name_repo });

export default connect(mapStateToProps)(IssuesList);
