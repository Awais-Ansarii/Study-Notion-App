import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className="text-richblack-5">
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>

          <p>
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form>
            {!emailSent && (
              <label>
                <p>Email Address</p>
                  <input
                    className="text-richblack-600 p-2 rounded-md"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </label>
              )}
              
              <button className="bg-richblack-500 p-2 rounded-md">
                {
                  !emailSent ? "Reset Password" : "Resend Email" 
                }
              </button>
            </form>
            <div>
              <Link  to='/login'>
                <p className="px-4 py-2">Back To Login</p>
              </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
