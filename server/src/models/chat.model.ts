import mongoose from "mongoose";

export interface Conversation {
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  message: string;
  productId: string;
}
export interface ChatInput {
  senderId: string;
  sellerId: string;
  senderName: string;
  sellerName: string;
  productId: string;
  productImage: string;
  title: string;
  conversation: Conversation[];
}

export interface ChatDocument extends ChatInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const conversationSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    sellerId: { type: String, required: true },
    senderName: { type: String, required: true },
    sellerName: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: String, required: true },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productImage: { type: String, required: true },
    senderId: { type: String, required: true },
    sellerId: { type: String, required: true },
    senderName: { type: String, required: true },
    sellerName: { type: String, required: true },
    title: { type: String, required: true },
    conversation: [conversationSchema],
  },
  { timestamps: true }
);

const ChatModel = mongoose.model<ChatDocument>("Chat", chatSchema);

export default ChatModel;
