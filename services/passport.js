/**
 * import passport and passport-google-oauth20
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

/**
 * passport.use, pwede nating isipin to as parange generic register
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
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('================================');
      console.log('ACCES TOKEN:');
      console.log(accessToken);
      console.log('================================');
      console.log('================================');
      console.log('REFRESH TOKEN:');
      console.log(refreshToken);
      console.log('================================');
      console.log('================================');
      console.log('PROFILE:');
      console.log(profile);
      console.log('================================');
    }
  )
);
