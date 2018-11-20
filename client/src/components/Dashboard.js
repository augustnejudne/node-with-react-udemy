import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large green">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </Fragment>
  );
};

export default Dashboard;
