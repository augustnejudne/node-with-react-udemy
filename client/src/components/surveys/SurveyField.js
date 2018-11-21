import React, { Component } from 'react';
import M from 'materialize-css';

class SurveyField extends Component {
  componentDidMount() {
    M.updateTextFields();
  }

  render() {
    return (
      <div className="input-field">
        <label>{this.props.label}</label>
        <input
          {...this.props.input}
          type="text"
          className="validate"
          style={{ marginBottom: '5px' }}
        />
        <div className="red-text" style={{ paddingBottom: '15px' }}>
          {this.props.meta.touched && this.props.meta.error}
        </div>
      </div>
    );
  }
}

export default SurveyField;
