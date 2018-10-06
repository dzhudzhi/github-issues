import React from 'react';
import { connect } from 'react-redux';

export class Error extends React.Component {
  render() {
    return (
      <div className="content-container">
          <p>{this.props.error}</p>
      </div>
  )};
}

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps)(Error);
