const express = require('express');
/**
 * so app constant initializes express instance.
 * pwede gumawa ng multiple express instances
 * pero most of the time, isa lang ang kailangan
 */
const app = express();

/**
 * get method
 * root route
 * get needs a callback function that has two parameters ( req, res )
 * res.send sends information to the client
 */
app.get('/', (req, res) => {
  res.send({ bye: 'goodbye!', nejudneFamily: {
    papa: 'kim',
    mama: 'donna',
    baby: 'cloud'
  } });
});

/**
 * app.listen tells Node to listen to heroku's PORT environment variable
 * or port 5000 for HTTP requests
 */

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/**
 * HEROKU DEPLOYMENT
 * git init
 * git add .
 * git commit -m "first deploy"
 * heroku login
 * heroku create
 * git push heroku master
 */