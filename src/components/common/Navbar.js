import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className=" h-16  border-b-[2px] border-richblack-700 flex justify-center items-center">
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center">
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
        <nav>
          <div className="flex gap-x-4 ">
            {
              //show cart
              user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="text-yellow-25" />
                  {totalItems > 0 && <span>{totalItems}</span>}
                </Link>
              )
            }

            {
              //show login button
              token === null && (
                <Link to="/login">
                  <button className="border border-richblack-700 bg-richblack-800 text-richblack-25 rounded px-[12px] py-[8px]">
                    Login
                  </button>
                </Link>
              )
            }
            {
              //show SignUp button
              token === null && (
                <Link to="/signup">
                  <button className="border border-richblack-700 bg-richblack-800 text-richblack-100 rounded px-[12px] py-[8px]">
                    Sign Up
                  </button>
                </Link>
              )
            }
            {
              //show SignUp button
              token !== null && <ProfileDropdown />
            }
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
