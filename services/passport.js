const mongoose = require('mongoose');
/** import passport and passport-google-oauth20 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * import the configuration keys for google
 */
const keys = require('../config/keys');

/**
 * import the User model
 * mongoose.model can take one or two arguments
 * when you provide one argument, that means you're trying to get something out of mongoose
 * when you provide two arguments, that means you're trying to load something into mongoose
 */
const User = mongoose.model('user');

/**
 * we generate some identifying token using serializeUser
 * this serializeUser function which we define is going to be
 *   called with our user model
 * we actually don't define serializeUser
 * what we do is we define a function and pass it to passport.serializeUser
 * the first argument 'user' is the User instance
 */
passport.serializeUser((user, done) => {
  /**
   * 'done' is a callback that we have to call after passport has done its work
   * the first argument to done is an error object
   * the second argument is the identifying piece of information
   *    that is going to identify the user in follow up requests
   *    it's called user.id
   * user.id is NOT the profile.id
   * user.id is a shortcut to the mongoDB _id Object
   * to uniquely identify the user, we're using the mongoDB record _id
   * we're using the mongoDB record _id instead of the profile.id because
   *    profile.id is unique to the Google OAuth process
   * after the user has signed in, we only care about our mongoDB record _id
   */
  done(null, user.id);
});

/**
 * the first argument is the exact token that we stuffed into the cookie
 *   and for us, this is the user.id
 * the second argument is the done function which we have to call after we
 *   have successfully returned the id back to the user
 */
passport.deserializeUser((id, done) => {
  // we find a user with the id we provided and pass the user to done
  User.findById(id).then(user => done(null, user));
});

/**
 * passport.use, pwede nating isipin to as parang generic register
 * we're telling passport kung paano mag-authenticate ng mga users
 * using a very specific service. in our case: Google
 *
 * new GoogleStrategy creates a new instance of GoogleStrategy
 * Inside GoogleStrategy(), we're going to pass in some configuration
 * that tells GoogleStrategy how to authenticate users inside of
 * our application
 *
 * Bago gamitin ang GoogleStrategy, kailangan natin magprovide ng
 * dalawang importanteng options: isang "client ID" at "client secret"
 * para makakuha ng client id at client secret, kailangan natin mag-signup
 * sa Google OAuth API.
 * so go to console.developer.google.com and create a new app
 * then enable the Google+ api and create your credentials
 *
 * yung clientID at clientSecret ko ay nakatago sa ./config/keys.js
 * yung new GoogleStrategy() kailangan nya ng dawalang arguments diba?
 * yung unang argument is an object na may clientID, clientSecret, at callbackURL
 * yung pangalawang argument is callback na tumatanggap ng 'accessToken' and others as parameter
 * dito, nag console.log lang tayo kung ano nilalaman ng accesToken
 */

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the fact that this path is relative causes google to
      //    drop the https from our callback url
      // in development, '/auth/google/callback' works
      // but this doesn't work in production
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id })
        .then(user => {
          return user ? user : new User({ googleID: profile.id }).save();
        })
        .then(user => {
          done(null, user);
        });
    }
  )
);
