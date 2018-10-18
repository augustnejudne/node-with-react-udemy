const passport = require('passport');

module.exports = app => {
  /**
   * whenever user goes to the route /auth/google/
   * passport.authenticate('google', ...)
   * 'google' <-- is the identifier we pass to passport
   * whenever passport tries to authenticate using the string of google,
   *   use the new GoogleStrategy we wrote in services/passport.js
   * the second argument is an options object
   * we pass in a 'scope' array
   * this specifies to the google servers that we want access to a couple of things
   * in this case, we want acces to the user's profile and email
   */
  app.get(
    '/auth/google/',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  /**
   * over here, we're handling the route for '/auth/google/callback'
   * because this is where google sends the user after authentication
   */
  app.get('/auth/google/callback', passport.authenticate('google'));

  // the is the logout route
  app.get('/api/logout', (req, res) => {
    // to logout
    req.logout();
    // try to send req.user but req.user no longer exists
    res.send(req.user);
  });

  // this one is just a test route to check which user is logged in
  app.get('/api/current_user', (req, res) => {
    // we send the user object
    res.send(req.user);
  });

  /**
   * get method
   * root route
   * get needs a callback function that has two parameters ( req, res )
   * res.send sends information to the client
   */
  // app.get('/', (req, res) => {
  //   res.send({
  //     bye: 'goodbye!',
  //     nejudneFamily: {
  //       papa: 'kim',
  //       mama: 'donna',
  //       baby: 'cloud'
  //     }
  //   });
  // });
};
