const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

const options = {
  from: `StaticSiteFaas <${process.env.GMAIL_USER}>`,
  to: process.env.GMAIL_USER,
  subject: 'yo',
  html: 'yo it is a test'
};

module.exports = async function (context, req) {

  transporter.sendMail(options, function(err, info) {
    if (err) {
      console.log(err);
      context.res = {
        status: 500,
        body: err
      };
      context.done();
    } else {
      console.log(info);
      context.res = {
        status: 200,
        body: info
      };
      context.done();
    }
  });

};
