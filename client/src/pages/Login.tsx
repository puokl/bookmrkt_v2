import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { createSessionSchema } from "../schema/sessionSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import getGoogleOAuthURL from "../utils/getGoogleUrl"; // Make sure this is compatible with your setup

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleLogin = async (values: CreateSessionInput): Promise<void> => {
    try {
      dispatch(login(values));
      navigate("/");
    } catch (error: any) {
      setLoginError(error.message);
      console.log("handleLogin() error", error);
    }
  };

  const googleUrl = getGoogleOAuthURL();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return <div className="spinner"></div>; // Replace with a Tailwind styled spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen m-4">
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-xs">
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@mail.com"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("email")}
          />
          <p className="text-sm text-red-600">
            {errors.email?.message?.toString()}
          </p>
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("password")}
          />
          <p className="text-sm text-red-600">
            {errors.password?.message?.toString()}
          </p>
        </div>
        <p className="text-sm text-red-600">{loginError}</p>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            SUBMIT
          </button>
        </div>
        {/* Google Login
        <p className="mt-4 text-center">Or login with Google</p>
        <a href={googleUrl} className="block px-4 py-2 mt-2 font-bold text-center text-white bg-red-500 rounded hover:bg-red-700">
          Google Login
        </a>
        */}
      </form>
    </div>
  );
};

export default Login;
