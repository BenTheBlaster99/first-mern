const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).json({ message: "invalid user " });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: " invalid password" });
    }
    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      "secret-key"
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sign = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userExist = await User.findOne({ username, email });
    if (userExist) {
      return res.status(400).json({ message: "error, user already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashPassword, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, sign };
