// import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar className="border-b-2 py-2">
        <div className="container mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            {/* Logo Section */}
            <Link
              to="/"
              className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-lg  text-blue-800">
                Secure Login System
              </span>
              Project
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar Section */}
            <form className="flex-none">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-[270px] px-2 py-1 border rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
                <AiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-full"></div>
                  <button className="relative px-4 py-1 bg-white m-[1px] rounded-full hover:bg-opacity-90 transition-all duration-200">
                    <span className="text-black font-semibold">Sign In</span>
                  </button>
                </div>
              </Link>
            )}

            {/* Sign In Button */}
            {/* <Link to="/sign-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-full"></div>
                <button className="relative px-4 py-1 bg-white m-[1px] rounded-full hover:bg-opacity-90 transition-all duration-200">
                  <span className="text-black font-semibold">Sign In</span>
                </button>
              </div>
            </Link> */}
            <Navbar.Toggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Navbar.Collapse className="md:hidden mt-2">
          <Navbar.Link
            as={Link}
            to="/"
            className="text-gray-700 hover:text-black"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/about"
            className="text-gray-700 hover:text-black"
          >
            About
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
