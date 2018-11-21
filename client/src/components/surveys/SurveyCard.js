import React, { Fragment } from 'react';

const SurveyCard = ({ _id, title, subject, body, yes, no, deleteSurvey, fetchSurveys }) => {
  return (
    <Fragment>
      <p>surveyCard.js</p>
      <div key={_id} className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{title}</span>
          <p>
            Subject:&nbsp;
            <strong>{subject}</strong>
          </p>
          <p className="card-content">Body: {body}</p>
        </div>
        <div className="card-action">
          <span className="badge white black-text">NO: {no}</span>
          <span className="badge white black-text">YES: {yes}</span>
        </div>
        <button
          className="btn red"
          onClick={async () => {
            await deleteSurvey(_id);
            fetchSurveys();
          }}
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
};

export default SurveyCard;
