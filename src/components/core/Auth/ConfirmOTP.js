import React, { useState } from "react";
import { setSignupData } from "../../../slices/authSlice";
import { signUp } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOTP = () => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const data = useSelector((store) => store.auth.signupData);
  const navigate = useNavigate();
  // console.log('user data ', data)
  // Handle Form Submission
  const handleOTPverification = (e) => {
    e.preventDefault();

    // console.log("signupData ", signupData);

    // const newdata = {
    //   ...data,
    //   otp,
    // };

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = data;

    // console.log("printing form data - ", accountType, firstName, password);

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleOTPverification}>
        <div>
          <label className="relative">
            <p className=" mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm OTP <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="number"
              name="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default ConfirmOTP;
