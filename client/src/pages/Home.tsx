import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import LocationFilter from "../components/LocationFilter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
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
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5 md:mb-0">
              <SideBar />
            </div>

            <div className="w-full md:w-4/5">
              <ProductList />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center min-h-screen pt-20 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-2xl text-center text-gray-800">
              <div className="w-full mb-16 ">
                <img
                  src="/bm.png"
                  className="object-cover w-auto h-auto mx-auto text-gray-800"
                  alt="logo"
                />
              </div>
              <div className="">
                <h1 className="mb-4 text-5xl font-extrabold">Rescue a Book,</h1>
                <h1 className="mb-4 text-5xl font-extrabold">Find a Friend:</h1>
                <h3 className="mb-2 text-3xl">
                  Explore a world of second-hand books.
                </h3>
                <p className="mb-8 text-3xl">
                  Buy, sell, and trade stories with fellow readers.
                </p>
                <div className="flex flex-col items-center justify-center">
                  <p>Register or test the application with a guest account</p>

                  <p
                    className={`${
                      isTooltipVisible ? "block" : "hidden"
                    } absolute bg-emerald-200 text-black px-4 py-2 rounded-lg -mt-40 w-72 text-center opacity-80`}
                  >
                    You may experience a cold start since the server is loaded
                    on a free instance type.
                    <br />
                    <u>It can take up to 90 seconds to load.</u>
                    <br />
                    Please wait.
                  </p>
                  <LocationFilter />

                  <button
                    onClick={() => handleLogin(credential)}
                    className="relative px-4 py-2 mt-6 font-bold text-gray-100 rounded-lg bg-violet-800 hover:bg-violet-500"
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
