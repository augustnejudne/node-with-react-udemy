// SurveyForm shows a form for user to add input
import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  // componentDidMount() {
  //   this.props.initialize({
  //     title: 'Test Title',
  //     subject: 'Test Subject',
  //     body: 'Test Body',
  //     emails: 'test@test.com, test2@test.com'
  //   });
  // }

  renderFields() {
    return formFields.map(({ name, label }) => {
      return (
        <Field key={name} label={label} name={name} component={SurveyField} />
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <h5>Create New Survey</h5>
          <form onSubmit={this.props.handleSubmit(this.props.onReview)}>
            {this.renderFields()}
            <Link to="/surveys" className="btn red">
              Cancel
            </Link>
            <button type="submit" className="btn right">
              <div className="left">Submit</div>
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name, noValueErr }) => {
    if (!values[name]) {
      errors[name] = noValueErr;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
