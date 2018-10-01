const express = require('express');
require('./services/passport');

/**
 * so app constant initializes express instance.
 * pwede gumawa ng multiple express instances
 * pero most of the time, isa lang ang kailangan
 */
const app = express();

/**
 * woah! What's happening here?
 * It's basically saying this:
 * require('./routes/authRoutes') returns a function
 * that returned function takes an argument.
 * so what we're doing is we're immediately calling
 * the function returned from ./routes/authRoutes and
 * supplying 'app' as argument
 */
require('./routes/authRoutes')(app);


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
