const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require(".././models/User.model");

// register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login

const login = async (req, res) => {
  const { email, password } = req.body;
};

// logout

module.exports = { registerUser };
