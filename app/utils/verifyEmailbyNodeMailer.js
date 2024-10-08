const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_APP_PASSWORD,
  },
});

function verifyEmailbyNodeMailer(email, verificationLink) {
  console.log(email, verificationLink);
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Please Verify Your Email Address",
    html: `<p style="text-align: center;">Click the following link to verify your email: <a href="${verificationLink}">Verify Email.</a> If you are running local server please make sure the URL contains the port number for example: http://localhost:8000/api/blogs</p>`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error while sending Email: ", err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

module.exports = verifyEmailbyNodeMailer;
