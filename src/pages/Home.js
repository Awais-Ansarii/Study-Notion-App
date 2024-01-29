import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
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
        <div className="shadow-blue-200 mx-3 my-12 ">
          <video muted loop autoPlay>
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

        <ExploreMore/>
      </div>

      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[220px]">
          <div className="w-11/12 max-w-maxContent flex flex-col justify-between  items-center gap-5 mx-auto">
            {/* buttons */}
            <div className="flex gap-7 text-white mt-16  ">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent  mx-auto flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row justify-center gap-5 mb-10 mt-20  ">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-8 w-[40%] items-start ">
              <p className="text-xs">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <CTAButton active={true} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* timeline  */}

          <TimelineSection />

          <LearningLanguageSection/>
        </div>

      </div>

      {/* section3 */}

      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
        <h2>Review from other learners</h2>
        {/* revirew slider is here */}

      </div>
      {/* footer 1-18-32 */}
      <Footer/>
    </div>
  );
};

export default Home;
