const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires:5*60,
  },
});

// a function to send email = pre-MiddleWare
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "verification email from Study-Notion", otp)
    console.log('email sent successfully for otp verification: ', mailResponse)

  }
  
  catch (error) {
    console.log("Error while sending email for otp verification");
    console.error(error);
    throw error;
  }
}
 

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp)
  next()
})

module.exports = mongoose.model("OTP", otpSchema);
