const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({
    username,
  }).exec();

  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);

    // Create JWTs to use with other protected routes
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" } // In production probably make it 5-15 min
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
    if (cookies?.jwt)
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

    // Saving refreshToken with the current user to the database.
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();
    console.log(result);
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      // secure: true, // Comment out when testing in ( JetClient || ThunderClient )
      maxAge: 24 * 60 * 60 * 1000,
    }); // 24(hrs) * 60(min) * 60(sec) * 1000(mile-sec) === 1 Day
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
