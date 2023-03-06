const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the database
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    // encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the user all at once with mongoose
    const result = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log(result);

    res.status(201).json({ success: `New User ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
