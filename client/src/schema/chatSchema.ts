import { object, string } from "zod";

export const createChatSchema = object({
  message: string().nonempty({
    message: "Message is required",
  }),
  senderName: string().nonempty({
    message: "Name is required",
  }),
});

export const createConversationSchema = object({
  message: string().nonempty({
    message: "Message is required",
  }),
});
