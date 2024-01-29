import { object, string, TypeOf, z } from "zod";

const conversationItemSchema = object({
  senderId: string({}),
  sellerId: string({}),
  senderName: string({}),
  sellerName: string({}),
  productId: string({}),
  message: string({ required_error: "A message is required" }).min(
    4,
    "Send a meaningful message, at least 4 charactes"
  ),
});

const payload = {
  body: object({
    senderId: string({}),
    sellerId: string({}),
    senderName: string({}),
    sellerName: string({}),
    productId: string({}),
    productName: string({}),
    productImage: string({}),
    title: string({}),
    conversation: z
      .array(conversationItemSchema)
      .refine(
        (value) => value.length > 0 || value.length === 0,
        "Conversation array should not be empty"
      ),
  }),
};

const params = {
  params: object({
    chatId: string({
      required_error: "chatId is required",
    }),
  }),
};

export const createChatSchema = object({
  ...payload,
});

export const updateChatSchema = object({
  ...payload,
  ...params,
});

export const deleteChatSchema = object({
  ...params,
});

export const getChatSchema = object({
  ...params,
});

export type CreateChatInput = TypeOf<typeof createChatSchema>;
// export type CreateChatInput = TypeOf<typeof payload.body>;
export type UpdateChatInput = TypeOf<typeof updateChatSchema>;
export type DeleteChatInput = TypeOf<typeof deleteChatSchema>;
export type GetChatInput = TypeOf<typeof getChatSchema>;

const conversationPayload = {
  body: object({
    message: string({}),
    senderId: string({}),
    sellerId: string({}),
    senderName: string({}),
    sellerName: string({}),
    productId: string({}),
    chatId: string({}),
  }),
};
export const addConversationSchema = object({
  ...conversationPayload,
});
export type AddConversationInput = TypeOf<typeof addConversationSchema>;
