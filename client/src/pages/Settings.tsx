import React, { useState, ChangeEvent } from "react";
import { uploadAvatar } from "../redux/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateProfile } from "../redux/slices/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const Settings = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [productError, setProductError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    if (selectedFile instanceof File) {
      setIsUploading(true);
      try {
        setProductError(null);
        setUploadSuccess(false);
        const response = await dispatch(uploadAvatar(selectedFile));
        if (uploadAvatar.rejected.match(response)) {
          const errorToShow = response.error.message;
          if (errorToShow) setProductError(errorToShow);
          return;
        }
        setUploadSuccess(true);
      } catch (error: any) {
        console.log("handleSubmitAvatar() error", error);
        setProductError("Error uploading image");
      } finally {
        setIsUploading(false);
      }
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
      if (
        selectedFile instanceof File ||
        (typeof selectedFile === "string" && selectedFile)
      ) {
        const data: updateProfileType = {
          avatar: { image: avatar },
          userId: user._id,
        };

        dispatch(updateProfile(data)).then(() => {
          window.location.reload();
        });
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
      <div className="min-h-screen pt-20 ">
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
              disabled={isUploading}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold border rounded text-cyan-600 border-cyan-600 md:mt-2 hover:bg-cyan-100 hover:text-cyan-700"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Picture"}
          </button>
          {/* Product Error */}
          {productError && (
            <p className="mb-4 text-sm text-red-500">{productError}</p>
          )}

          {/* Upload Success Message */}
          {uploadSuccess && (
            <p className="mb-4 text-sm text-green-500">
              Image uploaded successfully!
            </p>
          )}
          <button
            onClick={handleProfile}
            className="w-full px-4 py-2 mt-4 font-bold border rounded text-emerald-600 border-emerald-600 md:mt-2 hover:bg-emerald-100 hover:text-emerald-700"
            disabled={isLoading || !selectedFile}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
