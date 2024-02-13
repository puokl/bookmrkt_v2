import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ChatModel, { ChatDocument, ChatInput } from "../models/chat.model";

export async function createChat(input: ChatInput) {
  return ChatModel.create(input);
}

export async function findAllUserChat(userId: string) {
  return ChatModel.find({ sellerId: userId });
}

export async function findAllUserSentChat(userId: string) {
  try {
    const data = ChatModel.find({ senderId: userId });
    return data;
  } catch (error) {}
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
