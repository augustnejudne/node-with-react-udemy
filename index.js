const express = require('express');

// we're using mongoose to connect to our remote mongoDB
const mongoose = require('mongoose');

// we're using the cookie-session helper library to handle cookies
// to enable cookies in the first place and
// tell express to care about them at all
// we have to make use of cookieSession
// cookieSession is to give us access to cookies
// passport is to tell passport to make use of them
const cookieSession = require('cookie-session');
const passport = require('passport');

/**
 * these are the config keys
 * we're using the mongoose keys
 * for the mongo connect in this file
 */
const keys = require('./config/keys');

/**
 * kim nejudne, oct 18, 2018
 * we're taking out the user model from mongoose
 * declare the model before requiring the passport
 */
require('./models/User');

/**
 * when I require something, it just loads it?
 * i don't have to call it myself?
 * Yes. Aparrently, when you require something,
 *   the required file is just inserted in between
 */
require('./services/passport');

/**
 * kim nejudne, oct. 2, 2018
 * I required this file and I expected to see a new collection
 * in the mlab remote database but I didn't.
 */
// require('./models/User.js');

/**
 * Over here, I'm connecting to my remote mongoDB server
 *   I made on mlab.com
 */
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

/**
 * so app constant initializes express instance.
 * pwede gumawa ng multiple express instances
 * pero most of the time, isa lang ang kailangan
 */
const app = express();

// over here, we're telling our app to use the cookies
// this looks like a middleware
// cookie-session extracts cookie data
app.use(
  cookieSession({
    // maxAge is how long this cookie can exist inside the browser
    // before it is automatically expired
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // the second property is a key used to encrypt our cookie
    // we're going to save our cookie keys inside our keys.js file
    keys: [keys.cookieKey]
  })
);

// I'm not sure what these two do
// it's supposed to tell passport to use our cookieSession config
// passport uses that cookie
app.use(passport.initialize());
app.use(passport.session());

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
 * This is my place holder index route
 */
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/**
 * app.listen tells Node to listen to heroku's PORT environment variable
 * or port 5000 for HTTP requests
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

/**
 * HEROKU DEPLOYMENT
 * git init
 * git add .
 * git commit -m "first deploy"
 * heroku login
 * heroku create
 * git push heroku master
 */
