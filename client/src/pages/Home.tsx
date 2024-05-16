import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import LocationFilter from "../components/LocationFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { createSessionSchema } from "../schema/sessionSchema";
import { TypeOf } from "zod";
import {
  setOrderBy,
  setSelectedLanguage,
  setSelectedLocation,
  setSelectedCategory,
} from "../redux/slices/filterSlice";

type HomeProps = {};
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Home: React.FC<HomeProps> = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      // Set the selected location from local storage after login
      dispatch(setSelectedLocation(storedLocation));
    }
  }, [dispatch]);

  const credential = {
    email: "bob@gmail.com",
    password: "123456",
  };

  const handleLogin = async (credential: CreateSessionInput) => {
    try {
      dispatch(login(credential));
      navigate("/");
    } catch (error) {
      console.log("handleLogin() error", error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div className="flex flex-col md:flex-row 2xl:mx-auto 2xl:max-w-6xl 2xl:px-0">
            <div className="w-full md:w-1/5 md:mb-0 2xl:w-1/4">
              <SideBar />
            </div>

            <div className="w-full md:w-4/5 2xl:w-3/4">
              <ProductList />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center pt-2 md:min-h-screen md:pt-20 bg-stone-200 min-h-[85vh]">
            <div className="w-full max-w-2xl text-center">
              <div className="w-full mt-2 mb-6 md:mb-14">
                <img
                  src="/bm.png"
                  className="object-cover w-3/5 mx-auto md:w-auto md:h-auto"
                  alt="logo"
                />
              </div>
              <div className="text-stone-800">
                {" "}
                <h1 className="mb-2 text-4xl font-extrabold md:mb-4 md:text-5xl">
                  Rescue a Book,
                </h1>
                <h1 className="mb-2 text-4xl font-extrabold md:mb-4 md:text-5xl">
                  Find a Friend:
                </h1>
                <h3 className="mb-2 text-xl md:text-3xl">
                  Explore a world of second-hand books.
                </h3>
                <p className="mb-4 text-xl md:text-3xl">
                  Buy, sell, and trade stories with fellow readers.
                </p>
                <div className="flex flex-col items-center justify-center">
                  <p>Choose your city:</p>
                  <LocationFilter
                    styleDiv="text-stone-800 mb-6 mt-2 border border-stone-400 rounded-md "
                    styleSelect="bg-slate-200 px-2 text-stone-800 w-fit"
                  />
                  <p>
                    {" "}
                    <Link
                      to="/register"
                      className=" hover:text-blue-800 hover:underline"
                    >
                      Register{" "}
                    </Link>
                    or test the application with a guest account
                  </p>

                  <p
                    className={`${
                      isTooltipVisible ? "block" : "hidden"
                    } absolute bg-slate-800 px-4 py-2 rounded-lg -mt-10 w-90 text-center opacity-80 text-white`}
                  >
                    You may experience a cold start since the server is loaded
                    on a free instance type.
                    <br />
                    <u>It can take up to 90 seconds to load.</u>
                    <br />
                    Please wait.
                  </p>

                  <button
                    onClick={() => handleLogin(credential)}
                    className="relative px-4 py-2 mt-4 font-bold border rounded-lg md:mt-6 border-stone-400 text-stone-800 bg-slate-200 hover:bg-slate-400"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  >
                    Login as a guest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
