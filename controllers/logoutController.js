const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client also delete accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content to send back

  const refreshToken = cookies.jwt;

  // Is refresh token in DB?
  const foundUser = await User.findOne({
    refreshToken: refreshToken,
  }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  // Delete refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); // In production + { secure: true } - when send and delete cookie - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
