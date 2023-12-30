const mongoose = require("mongoose")
const mailSender = require('../utils/mailSender')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

// a function to send email = post-MiddleWare - passward changed
async function sendPasswordChangedEmail(email) {
  try {
    const mailResponse = await mailSender(email, "password updation email from Study-Notion", "Your Account Password has updated successfully")
    console.log('email sent successfully for password changed: ', mailResponse)

  }
  
  catch (error) {
    console.log("Error while sending email for password change");
    console.error(error);
    throw error;
  }
}
 

userSchema.post("save", async function (next) {
  await sendVerificationEmail(this.email);
  next();
});

module.exports = mongoose.model("User", userSchema)