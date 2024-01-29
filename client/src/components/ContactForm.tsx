import React from "react";
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

      closeModal();
    } catch (error) {
      console.log("error on handleChat()", error);
    }
  };

  return (
    <>
      <p className="mb-4">Hello from ContactForm</p>
      <form className="space-y-4" onSubmit={handleSubmit(handleChat)}>
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
        <div className="flex space-x-2">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send
          </button>
          <button
            onClick={closeModal}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
