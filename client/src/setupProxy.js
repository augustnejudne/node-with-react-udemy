////////////////////////////////////////////////////////////////////
// this file is necessary because we're using two different ports //
// one for the backend (5000) and one for the frontend (3000)     //
// the port functions as kind of like a redirect mechanism        //
// I don't know really                                            //
////////////////////////////////////////////////////////////////////
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
};
