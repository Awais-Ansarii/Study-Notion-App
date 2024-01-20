const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//auth middleWare - check authentication of user by checking json token
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorisation").replace("Bearer ", "") ||
      req.cookies.token ||
      req.body.token;
    //if token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify token
    try {
      const JWT_SECRET = process.env.JWT_SECRET;
      const decode = jwt.verify(token, JWT_SECRET);
      console.log("decode - ", decode);

      req.user = decode;
    } catch (err) {
      // verification issue
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Token - something went wrong while validating token",
      error: error,
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message:
          "User is not student, this is protected route for students only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can not be verified in Student-Auth, try again",
      error: error,
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message:
          "User is not Instructor, this is protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can not be verified in Instructor-Auth, try again",
      error: error,
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "User is not Admin, this is protected route for Admin only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can not be verified in Admin-Auth, try again",
      error: error,
    });
  }
};
