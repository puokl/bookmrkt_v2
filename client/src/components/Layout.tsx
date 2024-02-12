import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, reset } from "../redux/slices/authSlice";
import { TbLogout } from "react-icons/tb";
import {
  FaSignOutAlt,
  FaUser,
  FaPlus,
  FaEnvelope,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Search from "../components/search/Search";
import LocationFilter from "./LocationFilter";

type HoveredIcon =
  | "addBook"
  | "profile"
  | "message"
  | "settings"
  | "logout"
  | null;

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void | undefined;
  hoverText?: string;
};

const menuItems = [
  {
    label: "Add a book",
    icon: FaPlus,
    href: "/addproduct",
    hoverText: "addBook",
  },
  {
    label: "My Books",
    icon: FaUser,
    href: "/mybooks",
    hoverText: "addBook",
  },
  {
    label: "Messages",
    icon: FaEnvelope,
    href: "/messages/received/{userId}",
    hoverText: "addBook",
  },
  {
    label: "Settings",
    icon: FaCog,
    href: "/profile",
    hoverText: "addBook",
  },
  {
    label: "Logout",
    icon: FaSignOutAlt,
    onClick: "logOut",
    hoverText: "addBook",
  },
];

const Layout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<HoveredIcon>(null);
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  async function logOut() {
    try {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    } catch (error: any) {
      console.log("error on logOut()", error);
    }
  }

  const toggleMobileMenu = () => {
    setisMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Disable scroll on page when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // reset the overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="flex items-center w-full px-2 py-2 h-18 bg-emerald-200">
        <div className="flex items-center w-full h-full my-auto md:w-2/3">
          {user && (
            <div className="h-full ">
              <Link to="/">
                <img
                  src="/bmi.png"
                  className="object-cover mr-4 max-h-14 lg:hidden"
                  alt="logo"
                />
                <img
                  src="/bm.png"
                  className="hidden object-cover ml-4 max-h-14 lg:block"
                  alt="logo"
                />
              </Link>
            </div>
          )}
          {user && <Search />}
          {user && <LocationFilter />}
        </div>

        {user ? (
          <div className="w-1/3">
            <div className="flex items-center justify-around">
              <div className="hidden m-3 xl:block">
                <p className="text-xs">You are logged in as:</p>
                <p className="text-sm font-bold">
                  {user.email || user.user.email}
                </p>
              </div>

              <div
                className="relative m-2 "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={user.image || "/avatar.jpeg"}
                  alt={user.name}
                  className="object-cover w-10 h-10 rounded-full"
                />

                <span
                  className={`absolute ml-[-25px] px-2 py-1 text-xs text-black inline-block max-w-[200px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-[45px] ${
                    isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {user.email}
                </span>
              </div>

              {/* Desktop View */}
              <div className="items-center justify-center hidden md:flex">
                <div className="mx-2 icon-container">
                  <a
                    href="/addproduct"
                    className="relative m-2 text-gray-600 hover:text-gray-800"
                    onMouseEnter={() => setHoveredIcon("addBook")}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <FaPlus />
                  </a>
                  <span
                    className={`absolute ml-[-35px] px-2 py-1 text-xs text-black inline-block w-[80px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-12 ${
                      hoveredIcon === "addBook"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    Add a book
                  </span>
                </div>
                <div className="mx-2 icon-container">
                  <a
                    href="/mybooks"
                    className="m-2 text-gray-600 hover:text-gray-800"
                    onMouseEnter={() => setHoveredIcon("profile")}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <FaUser />
                  </a>
                  <span
                    className={`absolute ml-[-35px] px-2 py-1 text-xs text-black inline-block w-[73px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-12 ${
                      hoveredIcon === "profile"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    My Books
                  </span>
                </div>
                <div className="mx-2 icon-container">
                  <a
                    href={`/messages/received/${user._id}`}
                    className="m-2 text-gray-600 hover:text-gray-800"
                    onMouseEnter={() => setHoveredIcon("message")}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <FaEnvelope />
                  </a>
                  <span
                    className={`absolute ml-[-25px] px-2 py-1 text-xs text-black inline-block w-[75px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-12 ${
                      hoveredIcon === "message"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    Messages
                  </span>
                </div>
                <div className="mx-2 icon-container">
                  <a
                    href="/profile"
                    className="m-2 text-gray-600 hover:text-gray-800"
                    onMouseEnter={() => setHoveredIcon("settings")}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <FaCog />
                  </a>
                  <span
                    className={`absolute ml-[-25px] px-2 py-1 text-xs text-black inline-block w-[65px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-12 ${
                      hoveredIcon === "settings"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    Settings
                  </span>
                </div>
                <div className="mx-2 icon-container ">
                  <button
                    onClick={logOut}
                    className="m-2 text-gray-600 hover:text-gray-800"
                    onMouseEnter={() => setHoveredIcon("logout")}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <FaSignOutAlt />
                  </button>
                  <span
                    className={`absolute ml-[-40px] px-2 py-1 text-xs text-black inline-block w-[60px] whitespace-no-wrap transition-opacity duration-300 ease-in-out bg-white rounded-md top-12 ${
                      hoveredIcon === "logout"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    Logout
                  </span>
                </div>
              </div>

              {/* Mobile View */}
              <div className="flex items-center justify-between md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <FaBars size={24} />
                </button>
                <div
                  className={`w-full absolute top-14 ${
                    isMobileMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="fixed inset-0 z-50 md:hidden"
                    id="headlessui-dialog-:ra:"
                    role="dialog"
                    aria-modal="true"
                    data-headlessui-state="open"
                  >
                    <div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80"
                      id="headlessui-dialog-overlay-:rf:"
                      aria-hidden="true"
                      data-headlessui-state="open"
                      onClick={toggleMobileMenu}
                    ></div>

                    <div className="fixed w-[180px] max-w-xs p-4 text-base font-semibold bg-green-100 rounded-lg shadow-lg top-4 right-4 text-slate-400 ">
                      {menuItems.map((item, index) => (
                        <div className="mb-2 icon-container" key={index}>
                          {item.href ? (
                            <a
                              href={item.href.replace("{userId}", user._id)}
                              className="flex p-2 text-gray-600 rounded-md hover:text-gray-800 hover:bg-slate-400"
                            >
                              {<item.icon />}

                              <span className="ml-2 text-xs">{item.label}</span>
                            </a>
                          ) : (
                            <div key={index}>
                              {index > 0 && (
                                <div className="py-2">
                                  <div className="border-t border-gray-300"></div>
                                </div>
                              )}
                              <button
                                onClick={logOut}
                                className="flex w-full p-2 text-gray-600 rounded-md hover:text-gray-800 hover:bg-slate-400"
                              >
                                {React.createElement(item.icon)}
                                <span className="ml-2 text-xs">
                                  {item.label}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center w-1/3 mt-1">
            <a
              href="/login"
              className="p-2 mb-0 mr-3 text-sm rounded bg-cyan-400 hover:bg-cyan-300 md:text-md"
            >
              Login
            </a>
            <a
              href="/register"
              className="p-2 text-sm rounded bg-cyan-400 hover:bg-cyan-300 md:text-md"
            >
              Register
            </a>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
