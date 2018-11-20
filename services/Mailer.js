// const sendGrid = require('sendgrid');
// const helper = sendGrid.mail;

// const keys = require('../config/keys.js');

// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super();

//     this.sendGridApi = sendGrid(keys.sendGridKey);
//     this.from_email = new helper.Email('no-reply@emaily.com');
//     this.subject = subject;
//     this.body = new helper.Content('text/html', content);
//     this.recipients = this.formatAddresses(recipients);

//     // addContent is a built in function from helper.Mail
//     this.addContent(this.body);

//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     return recipients.map(({ email }) => {
//       return new helper.Email(email);
//     });
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();
//     this.recipients.forEach(recipient => {
//       personalize.addTo(recipient);
//     });
//     this.addToPersonalization(personalize);
//   }

//   async send() {
//     const request = this.sendGridApi.emptyRequest({
//       method: 'POST',
//       path: '/v3/mail/send',
//       body: this.toJSON()
//     });

//     // this is what actually sends the thing to sendGrid
//     const response = this.sendGridApi.API(request);
//     return response;
//   }
// }

// module.exports = Mailer;

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
  constructor({ subject, recipients }, content) {
    this.message = {
      to: recipients,
      from: 'no-reply@emaily.com',
      subject: subject,
      html: content,
      trackingSettings: {
        clickTracking: { enable: true }
      }
    };
    sgMail.setApiKey(keys.sendGridKey);
  }

  async send() {
    const response = await sgMail.sendMultiple(this.message);
    return response;
  }
}

module.exports = Mailer;
