import React from "react";
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
        senderId,
        sellerId,
        senderName,
        sellerName,
        productId,
        productImage,
      };
      const userInput = { conversation, chatId };
      dispatch(addConversation(userInput));
      window.location.reload();
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <>
      {/* <p className="mb-4">Hello from ConversationForm</p> */}
      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(handleConversation)}
      >
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
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default ConversationForm;
