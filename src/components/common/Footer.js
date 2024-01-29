import { FooterLink2 } from "../../data/footer-links";
// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Pages = ["About", "Careers", "Affiliates"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className=" w-11/12 max-w-maxContent relative mx-auto flex lg:flex-row gap-8 justify-between items-center text-richblack-400 py-14">
        <div className="border-b border-richblack-700 w-[100%] pb-5 flex lg:flex-row">
          {/* section1 */}

          <div className=" lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3 ">
            {/* herer 1*/}

            <div className=" w-[30%] lg:w-[30%] flex flex-col gap-3 mb-7 lg:pl-0">
              {/* imagee */}
              <img className="object-contain" src={Logo} alt="logo" />

              {/* heading  */}
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>

              {/* pages */}
              <div className="flex flex-col gap-2 ">
                {Pages.map((element, index) => {
                  return (
                    <div
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      key={index}
                    >
                      <Link to={element.toLowerCase()}>{element}</Link>
                    </div>
                  );
                })}
              </div>

              {/* icons  */}
              <div className="flex gap-3 text-lg">
                <FaFacebook className="cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                <FaGoogle className="cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                <FaTwitter className="cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                <FaYoutube className="cursor-pointer hover:text-richblack-50 transition-all duration-200" />
              </div>

              {/* empty div  */}
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((resourse, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px]   cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={resourse.split(" ").join("-").toLowerCase()}>
                        {resourse}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((plan, index) => {
                  return (
                    <div
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      key={index}
                    >
                      <Link to={plan.split(" ").join("-").toLowerCase()}>
                        {plan}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* section2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, index) => {
              return (
                <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 ">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div key={index}>
                          <Link
                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                            to={link.link}
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Made with ❤️ AwaisAnsari © 2024 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
