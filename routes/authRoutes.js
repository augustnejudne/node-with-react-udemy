const passport = require('passport');
/**
 * whenever user goes to the route /auth/google/
 * passport.authenticant('google', ...)
 * 'google' <-- is the identifier we pass to passport
 * whenever tries to authenticate using the string of google,
 *   use the new GoogleStrategy we wrote above
 * the second argument is an options object
 * we pass in a 'scope' array
 * this specifies to the google servers that we want access
 * to the user's profile and email address
 */

module.exports = (app) => {
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
