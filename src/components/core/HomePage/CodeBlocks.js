import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
import { TypeAnimation } from "react-type-animation";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 gap-10 justify-between`}>
      <HighlightText />
      {/* section1 */}
      <div className=" w-[50%`] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300  font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText} <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section2 */}
      <div className=" h-fit flex w-[100%] py-4 lg:w-[800px]">
        {/* try to add gradient in background */}
        <div className="text-center flex flex-col w-[10%] font-bold font-inter text-richblack-400">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 pr-2 font-mono ${codeColor} font-bold`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
