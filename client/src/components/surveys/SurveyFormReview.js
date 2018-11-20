import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({
  onCancel,
  formValues,
  submitSurvey,
  fetchUser,
  history
}) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <p style={{ fontSize: '16px', marginTop: '0px' }}>{formValues[name]}</p>
      </div>
    );
  });

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="btn orange" onClick={onCancel}>
        Back
      </button>
      <button
        className="btn green right"
        onClick={async () => {
          await submitSurvey(formValues, history);
          await fetchUser();
        }}
      >
        <div className="left">Send Survey</div>
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return {
    formValues: form.surveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
