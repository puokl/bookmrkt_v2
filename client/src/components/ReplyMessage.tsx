import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { addConversation } from "../redux/slices/chatSlice";
import { createConversationSchema } from "../schema/chatSchema";
import { addConversationType, conversationFormProps } from "../types/chatType";
import CustomToast from "./CustomToast";

type CreateConversationInput = TypeOf<typeof createConversationSchema>;

const ReplyMessage: React.FC<conversationFormProps> = ({
  sellerId,
  sellerName,
  chatId,
  productId,
  productImage,
}) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const senderName = user.name;
  const senderId = user._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationInput>({
    resolver: zodResolver(createConversationSchema),
  });

  const handleConversation = (values: addConversationType) => {
    try {
      console.log("values", values);
      const conversation = {
        ...values,
        senderName,
        sellerName,
        senderId,
        sellerId,
        chatId,
        productId,
        productImage,
      };
      const userInput = { conversation, chatId };
      dispatch(addConversation(userInput));
      setIsToastVisible(true);

      //   window.location.reload();
    } catch (error: any) {
      console.log("error", error);
    }
  };
  const handleToastClose = () => {
    setIsToastVisible(false);
  };
  return (
    <>
      <p className="mb-4">Hello from ReplyMessage</p>
      {isToastVisible && (
        <CustomToast
          message="Message sent successfully!"
          onClose={handleToastClose}
        />
      )}
      <form className="space-y-4" onSubmit={handleSubmit(handleConversation)}>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            id="message"
            type="text"
            placeholder="hello"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("message")}
          />
          <p className="text-sm text-red-600">
            {errors?.message?.message?.toString()}
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default ReplyMessage;
