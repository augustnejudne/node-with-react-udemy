import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'materialize-css/dist/css/materialize.min.css';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route path="/surveys/new" component={SurveyNew} />
                <Route exact path="/surveys" component={Dashboard} />
                <Route exact path="/" component={Landing} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </div>
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
  actions
)(App);
