import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import SurveyCard from './SurveyCard';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.map(({ _id, title, subject, body, yes, no }) => {
      return <SurveyCard key={_id} _id={_id} title={title} subject={subject} body={body} yes={yes} no={no} deleteSurvey={this.props.deleteSurvey} fetchSurveys={this.props.fetchSurveys}/>;
    }).reverse();
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
  { fetchSurveys, deleteSurvey }
)(SurveyList);
