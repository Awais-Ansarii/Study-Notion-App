import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className=" h-14  border-b-[2px] border-richblack-700 flex justify-center items-center">
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between ">
        <Link to="/">
          <img src={Logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div>{link.title}</div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
              </nav>
              

              {/* login signup dashboard */}
              <div className="flex gap-x-4 items-center">
                  
              </div>
      </div>
    </div>
  );
};

export default Navbar;
