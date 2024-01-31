import React, { useState, ChangeEvent } from "react";
import { uploadAvatar } from "../redux/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile } from "../redux/slices/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const Settings = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state) => state.image);

  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    try {
      if (selectedFile instanceof File) {
        dispatch(uploadAvatar(selectedFile));
      } else {
        console.log("selectedFile is not a File type");
      }
    } catch (error: any) {
      console.log("handleSubmitAvatar() error", error);
    }
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  interface updateProfileType {
    avatar: {
      image: string;
    };
    userId: string;
  }
  const handleProfile = () => {
    try {
      // Check if a file is selected before dispatching the updateProfile action
      if (
        selectedFile instanceof File ||
        (typeof selectedFile === "string" && selectedFile)
      ) {
        console.log("user inside handle profile", user);
        const data: updateProfileType = {
          avatar: { image: avatar },
          userId: user._id,
        };
        console.log("data in handleProfile", data);
        // dispatch(updateProfile(data));
        dispatch(updateProfile(data)).then(() => {
          // Reload the page after the dispatch is complete
          window.location.reload();
        });

        console.log("user after dispatch", user);
      } else {
        console.log("No file selected");
      }
    } catch (error: any) {
      console.log("handleProfile() error", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="h-screen pt-20 bg-emerald-100">
        {/* <p className="mb-2 text-lg font-semibold">Settings</p> */}
        {/* <p className="mb-4">Hi {user?.name}</p> */}

        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmitAvatar();
          }}
          className="max-w-md p-4 mx-auto rounded-md shadow-md bg-stone-100"
        >
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block mb-2 text-lg font-bold text-gray-700"
            >
              Choose a profile picture
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="w-full p-2 border rounded"
              onChange={handleAttachFile}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white rounded bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Upload Picture
          </button>

          <button
            onClick={handleProfile}
            className="w-full px-4 py-2 mt-4 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
