import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className=" w-11/12 max-w-maxContent mx-auto relative flex flex-col items-center justify-between text-white ">
        <Link to={"/signup"}>
          <div className="mt-12 p-1 shadow shadow-richblack-600 bg-richblack-800 rounded-full mx-auto text-richblack-200 font-bold hover:scale-95 transition-all duration-200 w-fit group">
            <div className="flex items-center gap-2 px-10 rounded-full py-1 group-hover:bg-richblack-900">
              <p> Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" w-[90%]  mt-4 text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkTo={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        {/* video section  */}
        <div className="shadow-blue-200 mx-3 my-12 mb-8">
          <video className="" muted loop autoPlay>
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="w-11/12">
          <CodeBlocks
            position={`lg:flex-row`}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text={"Coding Potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div className="w-11/12">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text={"Coding Potential"} /> with our
                online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>

      {/* section2 */}

      {/* section3 */}

      {/* footer */}
    </div>
  );
};

export default Home;
