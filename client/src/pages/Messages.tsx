import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAllReceivedUserChat,
  getAllSentUserChat,
} from "../redux/slices/chatSlice";
import ConversationModal from "../modals/ConversationModal";
import { chatType, conversationType } from "../types/chatType";
import { dateFromNow, toUpperCase, truncateString } from "../utils/textFormat";
import ConversationForm from "../components/ConversationForm";
import ReplyMessage from "../components/ReplyMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatDetails from "../components/ChatDetails";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<chatType | null>(null);
  const [selectedChatType, setSelectedChatType] = useState("sent");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedReceivedChat, setSelectedReceivedChat] =
    useState<chatType | null>(null);
  const dispatch = useAppDispatch();

  const handleTabClick = (chatType: string) => {
    // If the selected chat type is the same as the clicked one, close it
    setSelectedChatType((prevType) => (prevType === chatType ? "" : chatType));
  };
  const { receivedChat, sentChat, isLoading } = useAppSelector(
    (state: any) => state.chat
  );
  const { user } = useAppSelector((state) => state.auth);

  const handleChatClick = (
    chat: chatType,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Check if the clicked element is not a child of the ChatDetails component
    if (event.currentTarget === event.target) {
      // This means the user clicked on the ChatDetails component itself, so don't proceed with handleChatClick
      return;
    }

    // Toggle the selected chat based on its ID
    if (selectedChatType === "sent") {
      // If the selected chat is already open, close it
      setSelectedChat((prevChat) => (prevChat?._id === chat._id ? null : chat));
    } else if (selectedChatType === "received") {
      // If the selected received chat is already open, close it
      setSelectedReceivedChat((prevChat) =>
        prevChat?._id === chat._id ? null : chat
      );
    }
    // Toggle the selectedChatId state for background color
    setSelectedChatId((prevChatId) =>
      prevChatId === chat._id ? null : chat._id || null
    );
  };

  const selectedChatToShow =
    selectedChatType === "sent" ? selectedChat : selectedReceivedChat;
  const filteredChat = selectedChatType === "sent" ? sentChat : receivedChat;

  useEffect(() => {
    dispatch(getAllReceivedUserChat());
    dispatch(getAllSentUserChat());
    console.log("getAllSentUserChat", getAllSentUserChat);
    console.log("getAllReceivedUserChat", getAllReceivedUserChat);
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen p-2 m-2 ">
        <div className="flex ml-4 space-x-2 ">
          <button
            className={`m-2 px-4 my-4 py-1 rounded-md ${
              selectedChatType === "sent"
                ? "bg-stone-100 font-bold text-lg"
                : ""
            }`}
            onClick={() => handleTabClick("sent")}
          >
            Sent
          </button>
          <button
            className={`m-2 px-4 py-1 my-4 rounded-md ${
              selectedChatType === "received"
                ? "bg-stone-100 font-bold text-lg"
                : ""
            }`}
            onClick={() => handleTabClick("received")}
          >
            Received
          </button>
        </div>
        <hr className="my-2 border-t border-gray-300" />
        <p className="m-4 font-bold">
          {selectedChatType === "sent" ? "Sent Messages" : "Received Messages"}
        </p>
        <div className="main">
          <div className="lg:flex">
            {/* Left column for filteredChat on mobile and lg screens */}
            <div className="lg:w-1/2">
              <div className="flex flex-col w-full overflow-x-auto ">
                {filteredChat && filteredChat.length > 0 ? (
                  filteredChat.map((item: chatType) => (
                    <div
                      key={item._id}
                      className={`flex-shrink-0 p-2 m-1 mt-2 border  bg-slate-50 rounded-md cursor-pointer hover:bg-slate-100 lg:flex-col ${
                        selectedChatId === item?._id ? "bg-slate-200" : ""
                      }`}
                      onClick={(event) => {
                        handleChatClick(item, event);
                      }}
                    >
                      <div className="flex items-center w-full">
                        <img
                          src={item.productImage}
                          alt="Product"
                          className="object-cover w-20 h-20"
                        />
                        <div className="flex flex-col w-full m-2">
                          <div className="flex justify-between">
                            <p className="font-bold text-md">
                              {toUpperCase(item.senderName)}
                            </p>
                            <p>{dateFromNow(item.createdAt)}</p>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold">{item.title}</p>
                            <p>
                              {truncateString(item.conversation[0].message)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* on mobile */}
                      {selectedChatToShow?._id === item._id && (
                        <div className="lg:w-1/2 lg:min-w-[300px] lg:ml-4 mt-4 lg:mt-0 lg:hidden">
                          <ChatDetails chat={selectedChatToShow} user={user} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    {`At the moment you do not have any ${
                      selectedChatType === "sent" ? "sent" : "received"
                    } messages.`}
                  </p>
                )}
              </div>
            </div>

            {/* on lg screens */}
            <div className="hidden mt-2 lg:w-1/2 lg:block">
              {selectedChatToShow?._id && (
                <div className="lg:w-full lg:min-w-[300px] lg:mx-4 mt-4 lg:mt-0 lg:pr-4">
                  <ChatDetails chat={selectedChatToShow} user={user} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
