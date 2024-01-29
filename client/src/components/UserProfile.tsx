import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

const UserProfile = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div className="loader"></div>; // Replace with a Tailwind styled loader
  }

  return (
    <div className="p-4">
      <p className="text-xl font-semibold">Hello from userProfile</p>

      <p className="text-lg">{user?.name}</p>
    </div>
  );
};

export default UserProfile;
