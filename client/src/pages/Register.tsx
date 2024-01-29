import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUserSchema } from "../schema/userSchema";

type CreateUserInput = TypeOf<typeof createUserSchema>;

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (values: CreateUserInput) => {
    try {
      // console.log("values", values);
      dispatch(registerUser(values));
      navigate("/");
    } catch (e: any) {
      console.log("there is an error on the registration", e);
      setRegisterError(e.response.data);
    }
  };
  console.log("errors", { errors });

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <div className="loader"></div>; // Replace with a Tailwind styled spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen m-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("name")}
          />
          <p className="text-sm text-red-600">
            {errors.name?.message?.toString()}
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
        <div className="mb-3">
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="********"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("passwordConfirmation")}
          />
          <p className="text-sm text-red-600">
            {errors.passwordConfirmation?.message?.toString()}
          </p>
        </div>
        <p className="text-sm text-red-600">{registerError}</p>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
