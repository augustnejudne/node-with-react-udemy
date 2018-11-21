import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.map(({ _id, title, body, yes, no }) => {
      return (
        <div key={_id} className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>
              {body}
            </p>
          </div>
          <div className="card-action">
            <span className="badge white black-text">NO: {no}</span>
            <span className="badge white black-text">YES: {yes}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Fragment>
        {this.renderSurveys()}
      </Fragment>
    );
  }
}

function mapStateToProps({ surveys }) {
  return {
    surveys
  };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
