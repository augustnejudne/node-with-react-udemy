/**
 * So, payment! Here are the steps
 * on the client side:
 * > install react-stripe-checkout
 * > create a class component
 * > use the StripeCheckout component
 * > create .env.development & .env.production
 * > make the action creator to handle the token
 * > call the action creator using the token property in the StripeCHeckout component
 *
 * on the server side:
 * > install stripe
 * > install bodyparser
 * > app.use(bodyParser.json())
 * > create requireLogin.js
 * > create billingRoutes.js
 * > add credits to user model in User.js
 */

import React, { Component } from 'react';
// So we're using the STRIPE API for this.
// the keys related to these are declared in
//    .env.development
//    .env.production
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      // this is the stripeCheckout component
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        // nice, I don't have to go in and out of JS anymore
        // this token is how we handle the token using the action creator we created
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn blue">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
