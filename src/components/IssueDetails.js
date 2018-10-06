import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class IssueDetails extends React.Component {
  render() {
    const { issue } = this.props;
    return (
      <div className="issue-details">
        <div className="content-container">
          {!issue ?
            <Link to="/">Back</Link>
          :
            <div className="issue-details__title">
              <h1>{issue.title} #{issue.number}</h1>
              <div>
                <Link to={issue.user.html_url}>
                  {issue.user.login}
                </Link>
                {
                  ` opened this issue on
                  ${moment(issue.created_at).format('DD MMM YYYY')}
                  ${issue.comments} comments`
                }
              </div>
              <div className="issue-details__body">
                <a href={issue.user.html_url}>
                  <img className="avatar" src={issue.user.avatar_url}/>
                </a>
                <div>
                  {!issue.body ? 'No description provided' : issue.body}
                </div>
              </div>
              <div><Link to="/">Back</Link></div>
            </div>}
        </div>
      </div>

    );
  };
};

const mapStateToProps = (state, ownProps) => ({
  issue: state.issues.find((issue) => (issue.id === parseInt(ownProps.match.params.id)))
});

export default connect(mapStateToProps)(IssueDetails);
