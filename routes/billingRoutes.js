const keys = require('../config/keys');
// we require stripe using our secretKey
const stripe = require('stripe')(keys.stripeSecretKey);
// we will be using the requireLogin middleware we created
// to ensure that user is logged in, in order to access the /api/stripe route
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // this is where we put the logic to handle the token
  // we use the requireLogin middleware by referencing it here
  // we're not calling the function, just referencing it
  app.post('/api/stripe', requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 500 credits',
      source: req.body.id
    });

    // thanks to passport, we can access the current user as req.user
    // this is setup automatically by passport
    req.user.credits += 500;
    res.send(await req.user.save());
  });
};
