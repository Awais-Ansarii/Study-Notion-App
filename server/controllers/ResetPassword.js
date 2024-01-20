const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req ki body
    const { email } = req.body;

    //validate email - check verified user
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Email is not proper, try again",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Email is  not registered",
      });
    }

    //generate token
    const token = crypto.randomUUID();
    console.log("token - ", token);

    // update user by adding token  and expiration time
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    //generate link
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail to user containing the url
    await mailSender(
      email,
      "Password Reset link",
      `Password Reset Link - ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Email for reset password sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while reseting user's password, try again ",
      error: error.message,
    });
  }
};

// reset password in DB
exports.resetPasswordInDB = async (req, res) => {
  try {
    //fetch data from user ki body
    const { token, password, confirmPassword } = req.body;

    // validate karlo data ko
    if (!token || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All input fields are required",
      });
    }

    // newPassword and confirmNewPassword ko compare karo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "newPassword and confirmNewPassword are not matching, try again",
      });
    }

    //validate user
    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // token time check
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token is expired, please re-try",
      });
    }
    //hash password
    const newHashedPassword = await bcrypt.hash(password, 10);
    //update password in DB
    await User.findOneAndUpdate(
      {
        token: token,
      },
      { password: newHashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password resetted successfully in DB",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while reseting user's password in DB ",
      error: error.message,
    });
  }
};
