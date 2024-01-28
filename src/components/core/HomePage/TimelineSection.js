import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = ({}) => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo3,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo4,
      heading: "Leadership",
      Description: "Fully committed to the success company",
    },
  ];

  return (
    <div>
      <div className="flex gap-14 items-center ">
        {/* left-box for svg icons and text headings*/}
        <div className=" w-[45%]  flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div key={index} className="flex gap-6">
                {/* image-box */}
                <div className="w-10 h-10  bg-white items-center">
                  <img
                    className="m-auto"
                    src={element.Logo}
                    alt={element.heading}
                  />
                </div>

                <div className="">
                  <h2 className="font-semibold text-base">{element.heading}</h2>
                  <p className="text-sm">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* right-box for image */}
        <div className="relative shadow shadow-blue-100 ">
          {/* image */}
          <img
            src={TimelineImage}
            alt="TimelineImage"
            className=" shadow shadow-blue-100 rounded-lg  "
          />

          {/* overlap */}
          <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-8 left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex gap-5 items-center border-r border-caribbeangreen-400 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-200 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center border-r border-caribbeangreen-400 px-7 ">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-200 text-sm">type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
