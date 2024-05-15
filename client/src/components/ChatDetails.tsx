import { chatType, conversationType } from "../types/chatType";
import { dateFromNow, toUpperCase } from "../utils/textFormat";
import ConversationForm from "./ConversationForm";

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
    <div className="p-4 mr-4 border rounded-lg" onClick={handleDetailsClick}>
      <div className="flex justify-between p-1 px-3 mb-4 bg-gray-100 rounded-lg">
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

export default ChatDetails;
