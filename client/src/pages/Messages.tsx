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

interface ChatDetailsProps {
  chat: chatType | null;
  user: any;
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ chat, user }) => {
  const handleDetailsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Stop propagation to prevent the click event from reaching the outer container
    event.stopPropagation();
  };

  if (!chat) {
    return <p>No chat selected</p>;
  }
  return (
    <div
      className="p-4 mr-4 border border-red-500 rounded-md"
      onClick={handleDetailsClick}
    >
      <div className="flex justify-between p-1 mb-2 bg-gray-100">
        <p className="font-bold">{toUpperCase(chat.senderName)}</p>
        <p className="text-sm">{chat.title}</p>
      </div>

      {chat.conversation.map((message: conversationType) => {
        const isCurrentUser = message.senderName === user.name;
        return (
          <div
            key={message._id}
            className={`flex ${isCurrentUser ? "flex-row-reverse" : ""} mb-2`}
          >
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                isCurrentUser ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              <span className="text-sm text-white">
                {message.senderName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col ml-2 mr-2">
              <div
                className={`${
                  isCurrentUser ? "bg-green-200" : "bg-blue-200"
                } p-2 rounded-md`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
              <p className="text-xs text-gray-600">
                {dateFromNow(message.createdAt)}
              </p>
            </div>
          </div>
        );
      })}

      {chat._id && (
        <ConversationForm
          chatId={chat._id}
          sellerId={chat.sellerId}
          sellerName={chat.sellerName}
          productId={chat.productId}
          productImage={chat.productImage}
        />
      )}
    </div>
  );
};

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
      <div className="flex flex-col p-2 bg-emerald-100">
        <div className="flex space-x-2 ">
          <button
            className={`m-2 p-2 my-4 rounded-md ${
              selectedChatType === "sent" ? "bg-emerald-300" : ""
            }`}
            onClick={() => handleTabClick("sent")}
          >
            Sent Items
          </button>
          <button
            className={`m-2 p-2 my-4 rounded-md ${
              selectedChatType === "received" ? "bg-emerald-300" : ""
            }`}
            onClick={() => handleTabClick("received")}
          >
            Inbox
          </button>
        </div>

        <p className="mt-4 mb-2 text-lg font-bold">
          {selectedChatType === "sent" ? "Sent Messages" : "Received Messages"}
        </p>
        <div className="main">
          <div className="lg:flex">
            {/* Left column for filteredChat on mobile and lg screens */}
            <div className="lg:w-1/2">
              <div className="flex flex-col w-full overflow-x-auto ">
                {filteredChat &&
                  filteredChat.map((item: chatType) => (
                    <div
                      key={item._id}
                      className={`flex-shrink-0 p-2 m-1 border border-cyan-800 bg-cyan-50 rounded-md cursor-pointer hover:bg-cyan-100 lg:flex-col ${
                        selectedChatId === item?._id ? "bg-gray-200" : ""
                      }`}
                      onClick={(event) => {
                        handleChatClick(item, event);
                        // setSelectedChatId(item?._id || null);
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
                  ))}
              </div>
            </div>

            {/* on lg screens */}
            <div className="hidden lg:w-1/2 lg:block">
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
