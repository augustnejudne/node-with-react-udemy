// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview.js';

class SurveyNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formReview: false
    };

    this.onReview = this.onReview.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onReview() {
    this.setState({
      formReview: true
    });
  }

  onCancel() {
    this.setState({
      formReview: false
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.formReview ? (
          <SurveyFormReview onCancel={this.onCancel} />
        ) : (
          <SurveyForm onReview={this.onReview} />
        )}
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
