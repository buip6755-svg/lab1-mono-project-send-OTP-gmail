const User = require("../models/user.model");

// Lấy tất cả user
const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Lấy user theo ID
const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Tạo user
const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

// Update user
const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true
  }).select("-password");
};

// Xóa user
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};