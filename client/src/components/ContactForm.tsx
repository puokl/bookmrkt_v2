import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { createChatSchema } from "../schema/chatSchema";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { createChat } from "../redux/slices/chatSlice";
import { chatInputType, conversationType } from "../types/chatType";

type ContactFormProps = {
  productId: string;
  productImage: string;
  sellerName: string;
  sellerId: string;
  closeModal: () => void;
  title: string;
};

type CreateChatInput = TypeOf<typeof createChatSchema>;

const ContactForm: React.FC<ContactFormProps> = ({
  productId,
  sellerName,
  sellerId,
  closeModal,
  title,
  productImage,
}) => {
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const senderId = user._id;
  const senderName = user.name;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatInput>({
    resolver: zodResolver(createChatSchema),
  });

  const handleChat = (values: chatInputType) => {
    try {
      const conversation: conversationType = {
        ...values,
        senderId,
        senderName,
        productId,
        sellerName,
        sellerId,
        title,
        productImage,
      };
      const conversationArray: conversationType[] = [conversation];
      const chatData = {
        conversation: conversationArray,
        senderId,
        senderName,
        productId,
        sellerName,
        sellerId,
        title,
        productImage,
      };
      dispatch(createChat(chatData));
      setIsMessageSent(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.log("error on handleChat()", error);
      setIsError(true);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(handleChat)}>
        {isMessageSent && (
          <p className="px-6 py-2 text-green-600 bg-green-100 border border-green-600 rounded w-fit">
            Message sent successfully!
          </p>
        )}
        {isError && (
          <p className="px-6 py-2 text-red-600 bg-red-100 border border-red-600 rounded w-fit">
            Something went wrong, please try again.
          </p>
        )}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="message"
            placeholder="Hello, "
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("message")}
          />
          <p className="text-sm text-red-600">
            {errors?.message?.message?.toString()}
          </p>
        </div>
        <div>
          <label
            htmlFor="senderName"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="senderName"
            type="text"
            defaultValue={senderName}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("senderName")}
          />
          <p className="text-sm text-red-600">
            {errors?.senderName?.message?.toString()}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-2 mr-4 text-sm font-medium border rounded text-emerald-600 border-emerald-600 md:mt-2 hover:bg-emerald-100 hover:text-emerald-700"
          >
            Send
          </button>
          <button
            onClick={closeModal}
            className="inline-flex justify-center px-6 py-2 ml-4 text-sm font-medium text-red-600 border border-red-600 rounded md:mt-2 hover:bg-red-100 hover:text-red-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
