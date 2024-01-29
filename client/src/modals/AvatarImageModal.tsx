import React, { useState, ChangeEvent } from "react";
import { uploadAvatar } from "../redux/slices/imageSlice";
import { useAppDispatch } from "../redux/hooks";

type AvatarImageModalProps = {};

const AvatarImageModal: React.FC<AvatarImageModalProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    try {
      if (typeof selectedFile !== "string")
        dispatch(uploadAvatar(selectedFile));
    } catch (error: any) {
      console.log("handleSubmitAvatar() error", error);
    }
  };

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="m-1 font-bold hover:text-gray-500"
      >
        Add a picture
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Choose your avatar</p>
              <button
                className="modal-close cursor-pointer z-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-black">X</span>
              </button>
            </div>

            <div className="mt-2">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmitAvatar();
                }}
              >
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="py-2 px-4 border rounded"
                  onChange={handleAttachFile}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send picture
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarImageModal;
