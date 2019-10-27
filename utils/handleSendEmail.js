const nodemailer = require("nodemailer");

module.exports = async ({ to, subject, text }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // let info = await transporter.sendMail({
  return await transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};
