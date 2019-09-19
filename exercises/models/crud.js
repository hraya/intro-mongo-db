const User = require("./user");

const getUserById = id => {
  const user = User.findById(id).exec();
  return user;
};

const getAllUsers = () => {
  const users = User.find({}).exec();
  return users;
};

const createUser = userDetails => {
  const newUser = User.create(userDetails);
  return newUser;
};
const removeUserById = id => {
  const removed = User.findOneAndRemove(id).exec();
  return removed;
};

const updateUserById = (id, update) => {
  const updated = User.findByIdAndUpdate(id, update, { new: true }).exec();
  return updated;
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
};
