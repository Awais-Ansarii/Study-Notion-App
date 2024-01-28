import HighlightText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <div className="mt-24 mb-20">
      <div className="flex flex-col gap-5 items-center">
        <div className=" text-4xl font-semibold text-center">
          Your Swiss Knife for
          <HighlightText text={"Learning any Language"} />
        </div>
        <div className="text-center text-richblack-600 text-base mt-3 w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/* 3 positioned images  */}
        <div className="flex items-center justify-center mt-2 ">
          <img
            src={Know_your_progress}
            alt="Know_your_progress"
            className="object-contain -mr-32"
          />
          <img
            src={Compare_with_others}
            alt="Compare_with_others"
            className="object-contain"
          />
          <img
            src={Plan_your_lessons}
            alt="Plan_your_lessons"
            className="object-contain -ml-36"
          />
        </div>

        {/* button */}
        <div className="">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
