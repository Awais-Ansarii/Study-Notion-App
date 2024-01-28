import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
const InstructorSection = () => {
  return (
    <div>
      <div className="flex gap-20 items-center mt-10">
        {/* left - img */}
        <div className="w-[50%] shadow shadow-white">
          <img src={Instructor} alt="Instructor" />
        </div>

        {/* right */}
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>
          <p className=" w-[80%] text-sm font-medium text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkTo={"/signup"}>
              <div className="flex gap-2">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
