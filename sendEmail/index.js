const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

module.exports = async function (context, req) {
  if (req.body && req.body.email && req.body.message) {
    const options = {
      from: `StaticSiteFaas <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: req.body.subject,
      html: `<h2>Message from ${req.body.email}.</h2><p>${req.body.message}</p>`
    };
    try {
      let info = await transporter.sendMail(options);
      context.res = {
        body: 'sent email'
      };
    } catch (err) {
      context.log('error', err);
      context.res = {
        status: 500,
        body: 'email could not be sent'
      };
    }
  } else {
    context.res = {
      status: 422,
      body: 'Unprocessable Entity'
    };
  }
};
