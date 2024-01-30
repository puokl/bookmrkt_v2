import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { createSessionSchema } from "../schema/sessionSchema";
import { TypeOf } from "zod";

type HomeProps = {};
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

interface CustomPopupProps {
  message: string;
  onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-4 bg-gray-800 bg-opacity-75 rounded-lg">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-800">{message}</p>
          <button
            className="px-4 py-2 mt-4 text-white rounded-md bg-violet-800 hover:bg-violet-600 focus:outline-none focus:shadow-outline-violet"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const credential = {
    email: "bob@gmail.com",
    password: "123456",
  };

  // const handleLogin = async (credential: CreateSessionInput) => {
  //   try {
  //     dispatch(login(credential));
  //     navigate("/");
  //   } catch (error) {
  //     console.log("handleLogin() error", error);
  //   }
  // };
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (credential: CreateSessionInput) => {
    try {
      setLoading(true);

      await dispatch(login(credential));

      navigate("/");
    } catch (error) {
      console.log("handleLogin() error", error);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [showPopup]);

  return user ? (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/5 lg:mb-0">
          <SideBar />
        </div>

        <div className="w-full lg:w-4/5">
          <ProductList />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col items-center min-h-screen pt-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="w-full max-w-2xl text-center text-gray-800">
          <div className="w-full mb-16 ">
            {/* Image */}
            <img
              src="/bm.png"
              className="object-cover w-auto h-auto mx-auto text-gray-800"
              alt="logo"
            />
          </div>
          <div className="">
            {/* Text Content */}
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
              {showPopup && (
                <CustomPopup
                  message="Please be aware that we're using a free hosting plan, and as a result, you may encounter a slight delay during the initial server load. This is known as a 'cold start' and can take up to 90 seconds. We appreciate your patience. Please wait while we get everything up and running for you."
                  onClose={() => setShowPopup(false)}
                />
              )}
              <button
                onClick={() => handleLogin(credential)}
                className="px-4 py-2 mt-6 text-gray-100 rounded-lg pb-10font-bold bg-violet-800 hover:bg-violet-500"
              >
                Login as a guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
