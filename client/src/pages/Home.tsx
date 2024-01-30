import React from "react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { createSessionSchema } from "../schema/sessionSchema";
import { TypeOf } from "zod";

type HomeProps = {};
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Home: React.FC<HomeProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
