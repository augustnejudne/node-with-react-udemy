const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

module.exports = app => {
  app.get('/api/surveys/:surveyId/yes', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // When using axios, req.body is actually just the body
    const events = _.map(req.body, (event) => {
      const pathname = new URL(event.url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');
      console.log(p.test(pathname));
    });
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // recipients is a subdocument collection of the RecipientsSchema
      // we take the comma separated list of recipients above
      // we split it using a comma
      // then, using map, we create an array of objects that look like this: { email: 123@abc.com }
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
