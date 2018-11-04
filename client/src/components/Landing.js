import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <div className="center">
          <h1>Emaily!</h1>
          <p>Collect Feedback from your users</p>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(
  mapStateToProps,
  null
)(Landing);
