import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ChatModel, { ChatDocument, ChatInput } from "../models/chat.model";

export async function createChat(input: ChatInput) {
  console.log("createChat service", input);
  return ChatModel.create(input);
}

export async function findAllUserChat(userId: string) {
  return ChatModel.find({ sellerId: userId });
}

export async function findAllUserSentChat(userId: string) {
  try {
    console.log("userId in findAllUserSentChat", userId);
    const data = ChatModel.find({ senderId: userId });
    console.log("data in findAllUserSentChat", data);
    return data;
  } catch (error) {}
  // return ChatModel.find({ senderId: userId });
}

export async function findConversation(chatId: string) {
  return ChatModel.findById(chatId);
}

export async function findAndUpdateChat(
  query: FilterQuery<ChatDocument>,
  update: UpdateQuery<ChatDocument>,
  options: QueryOptions
) {
  return ChatModel.findOneAndUpdate(query, update, options);
}
