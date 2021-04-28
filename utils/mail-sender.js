const nodemailer = require("nodemailer");

const sendMail = (email, subject, message) => {
  const transport = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "optimist_gm@hotmail.com",
      pass: "GmOptimist9"
    },
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
  });

  var mailOptions = {
    from: '"Car Service" <optimist_gm@hotmail.com>',
    to: email,
    subject: subject,
    text: message,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("nodemailer error", error);
    } else {
      console.log("nodemailer success", info.messageId);
    }
    transport.close();
  });
}

module.exports = { sendMail }