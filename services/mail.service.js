const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (toEmail, name) => {
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Chào mừng bạn 🎉",
    html: `
      <h2>Xin chào ${name} 👋</h2>
      <p>Bạn đã đăng ký tài khoản thành công!</p>
      <p>Chúc bạn học tốt 🚀</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
};