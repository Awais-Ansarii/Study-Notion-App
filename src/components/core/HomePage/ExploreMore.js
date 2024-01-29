import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="mb-5">
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>

      <p className="text-center text-richblack-300 text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>

      {/* tab  */}
      <div className="flex flex-row items-center w-[50%] mx-auto  bg-richblack-800 rounded-full p-1 mt-4 justify-evenly shadow-richblack-600 shadow-md">
        {tabsName.map((element, index) => {
          return (
            <div
              className={` ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : " text-richblack-200"
              } text-[16px]  cursor-pointer rounded-full transition-all duration-200 px-4 py-3  hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[100px]"></div>

      {/* course ke cards ka div */}

      <div className="flex items-center justify-evenly">
        
        {courses?.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
