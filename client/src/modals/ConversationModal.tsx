import React, { useState } from "react";
import ConversationForm from "../components/ConversationForm";

export type ConversationModalProps = {
  buttonText: string;
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  chatId: string;
  productId: string;
  productImage: string;
};

const ConversationModal: React.FC<ConversationModalProps> = ({
  buttonText,
  senderId,
  sellerId,
  senderName,
  sellerName,
  chatId,
  productId,
  productImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    window.location.reload();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="w-25 h-6 bg-gray-100">
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex">
          <div className="relative p-5 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-black font-semibold">
                Close
              </button>
            </div>
            <div className="mt-2">
              <ConversationForm
                chatId={chatId}
                sellerId={sellerId}
                sellerName={sellerName}
                productId={productId}
                productImage={productImage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationModal;
