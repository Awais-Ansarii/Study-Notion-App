import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className=" w-11/12 mx-auto relative flex flex-col items-center justify-center text-white border-2 border-yellow-50">
        <Link to={"/signup"}>
          <div>
            <div>
              <p> Become an Instructor </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>

      {/* section2 */}

      {/* section3 */}

      {/* footer */}
    </div>
  );
};

export default Home;
