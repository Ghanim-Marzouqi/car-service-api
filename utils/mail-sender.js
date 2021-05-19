const nodemailer = require("nodemailer");

const sendMail = (email, subject, message) => {
  const transport = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "<hotmail>",
      pass: "<password>"
    },
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
  });

  var mailOptions = {
    from: '"Car Service" <hotmail>',
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
