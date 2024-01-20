const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mailSender = require("../utils/mailSender");

dotenv.config();

//send OTP for verification
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from user ki body
    const { email } = req.body;

    //check if user is already registered with same email id
    const checkUserPresent = await User.findOne({ email });

    //if user email already exist then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered with this email id",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated - ", otp);

    //check wether otp is uniq or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      // otp = otpGenerator.generate(6, { //generate method?
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    //create otp object - otp payload
    const otpPayload = { email, otp };

    //create entry for otp in db
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    //return response
    res.status(200).json({
      success: true,
      message: "OTP sent successfully on your email",
      otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while sending otp during registeration",
      error: error.message,
    });
  }
};

//signUp
exports.signUp = async (req, res) => {
  try {
    //fetch email from user ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate karlo data ko
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All input fields are required",
      });
    }
    //2 password match kr ke dekho
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmPassword didnt matched",
      });
    }

    //check if user is already registered with same email id
    const exitstingUser = await User.findOne({ email });
    if (exitstingUser) {
      return res.status(401).json({
        success: false,
        message: "User already registered with this email id",
      });
    }

    //find most recent otp stored in db for user
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOTP);

    //validate otp
    if (recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry in db

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      additionalDetails: profileDetails._id,
    });

    //return response
    return res.status(200).json({
      success: true,  
      message: "User is registered successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while sign-up user, can't register user, try again ",
      error: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //fetch email from user ki body
    const { email, password } = req.body;

    // validate karlo data ko
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All input fields are required",
      });
    }

    //check if user is already registered or not
    const exitstingUser = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!exitstingUser) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with this email id, sign-up please..",
      });
    }

    //compare password in db
    if (await bcrypt.compare(password, exitstingUser.password)) {
      //generate token - JWT
      const JWT_SECRET = process.env.JWT_SECRET;
      const payload = {
        email: exitstingUser.email,
        id: exitstingUser._id,
        accountType: exitstingUser.accountType,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "2h",
      });
      exitstingUser.token = token; //toObject(_)
      exitstingUser.password = undefined;

      //create cookie return response
      const Options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, Options).status(200).json({
        success: true,
        message: "User is Logged-in successfully",
        user: exitstingUser,
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging user, try again ",
      error: error.message,
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    //fetch email from user ki body
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    // validate karlo data ko
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All input fields are required",
      });
    }

    // newPassword and confirmNewPassword ko compare karo
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "newPassword and confirmNewPassword are not matching, try again",
      });
    }

    //oldpassword ko db me compare karo
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user email is not registered",
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      //hash password
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("hashedPassword - ", newHashedPassword);

      //update password in DB
      await User.findOneAndUpdate(
        {
          email: email,
        },
        { password: newHashedPassword },
        { new: true }
      );

      await mailSender(
        email,
        "PassWord Update",
        "Your Password is changes successfully"
      );

      return res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is wrong, try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while changing user's password, try again ",
      error: error.message,
    });
  }
};
