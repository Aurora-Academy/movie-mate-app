const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ email, subject, htmlMsg }) => {
  const { messageId } = await transporter.sendMail({
    from: '"Raktim Shrestha" <raktim@rumsan.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: htmlMsg, // html body
  });
  return messageId;
};

module.exports = { sendMail };
