import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf } from "zod";
import { addConversation } from "../redux/slices/chatSlice";
import { createConversationSchema } from "../schema/chatSchema";
import { addConversationType, conversationFormProps } from "../types/chatType";

type CreateConversationInput = TypeOf<typeof createConversationSchema>;

const ConversationForm: React.FC<conversationFormProps> = ({
  sellerId,
  sellerName,
  chatId,
  productId,
  productImage,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const senderName = user.name;
  const senderId = user._id;
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationInput>({
    resolver: zodResolver(createConversationSchema),
  });

  const handleConversation = (values: addConversationType) => {
    try {
      const conversation = {
        ...values,
        senderId,
        sellerId,
        senderName,
        sellerName,
        productId,
        productImage,
      };
      const userInput = { conversation, chatId };
      setIsMessageSent(true);
      dispatch(addConversation(userInput));
      window.location.reload();
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(handleConversation)}
      >
        {isMessageSent && (
          <p className="px-6 py-2 text-green-600 bg-green-100 border border-green-600 rounded w-fit">
            Message sent successfully!
          </p>
        )}
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
            placeholder="Hello"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("message")}
          />
          <p className="text-sm text-red-600">
            {errors?.message?.message?.toString()}
          </p>
        </div>
        <div className="flex justify-end md:mt-2">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-100 hover:text-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default ConversationForm;
