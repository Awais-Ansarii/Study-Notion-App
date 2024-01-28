import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-xs px-6 py-3 font-bold rounded-md shadow 
          ${
            active
              ? "bg-yellow-50 text-black shadow-yellow-5 "
              : "bg-richblack-800 shadow-richblack-300"
          } hover:scale-95 transition-all duration-200 `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
