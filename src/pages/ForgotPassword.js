import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()


  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className="text-richblack-5 flex justify-center items-center h-[80vh]  ">
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

          <form onSubmit={handleOnSubmit}>
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
              
              <button type="submit" className="bg-richblack-500 p-2 rounded-md">
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
