const User = require("../model/User");
const bcrypt = require("bcrypt");
const Employee = require("../model/Employee");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No Users Found." });
  res.json(users);
};
const updateUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const user = await User.findOne({
    _id: req.body.id,
  }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}.` });
  }
  if (req.body?.username) user.username = req.body.username;
  if (req.body?.password)
    user.password = await bcrypt.hash(req.body.password, 10);
  const result = await user.save();
  res.json({ "User Updated!!": result });
};
const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required." });
  const user = await User.findOne({
    _id: req.body.id,
  }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}.` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json({ "User Deleted!!": result });
};
const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID required." });
  }
  const user = await User.findOne({
    _id: req.params.id,
  }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found.` });
  }
  res.json(user);
};

module.exports = { getAllUsers, updateUser, deleteUser, getUser };
