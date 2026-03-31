const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailService = require("./mail.service");
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const register = async ({ name, email, password }) => {
  // check email tồn tại
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 🔥 Gửi email (không block hệ thống)
  mailService
    .sendWelcomeEmail(user.email, user.name)
    .catch((err) => console.log("Send mail error:", err.message));

  return {
    user,
    token: generateToken(user),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email hoặc password không đúng");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email hoặc password không đúng");
  }

  return {
    user,
    token: generateToken(user),
  };
};

module.exports = {
  register,
  login,
};