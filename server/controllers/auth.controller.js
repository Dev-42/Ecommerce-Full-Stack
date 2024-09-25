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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await UserModel.findOne({ email });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }
    // Correct : Create a token and pass that token to our user since his password has matched
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    // passing the token via a cookie
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured while login",
    });
  }
};

// logout

module.exports = { registerUser, loginUser };
