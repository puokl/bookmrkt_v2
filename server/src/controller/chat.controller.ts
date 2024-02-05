import { Request, Response } from "express";
import {
  AddConversationInput,
  CreateChatInput,
  UpdateChatInput,
} from "../schema/chat.schema";
import {
  findConversation,
  createChat,
  findAllUserChat,
  findAllUserSentChat,
  findAndUpdateChat,
} from "../service/chat.service";

// @desc    Create a single chat
// @route   POST /api/chat
// @access  Private
export async function createChatHandler(
  req: Request<{}, {}, CreateChatInput["body"]>,
  res: Response
) {
  try {
    const senderID = res.locals.user._id;
    const body = req.body;
    const chat = await createChat({ ...body });

    return res.send(chat);
  } catch (error) {
    console.log("error", error);
  }
}

// @desc    Get all chat received from a user
// @route   GET /api/chat/received
// @access  Private
export async function getAllUserChatHandler(
  req: Request<UpdateChatInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const chat = await findAllUserChat(userId);
  if (!chat) {
    return res.sendStatus(404);
  }

  return res.send(chat);
}

// @desc    Get all chat sent from a user
// @route   GET /api/chat/sent
// @access  Private
export async function getAllUserSentChatHandler(
  req: Request<UpdateChatInput["params"]>,
  res: Response
) {
  // console.log("res.locals", res.locals);
  const userId = res.locals.user._id;
  const chat = await findAllUserSentChat(userId);
  if (!chat) {
    return res.sendStatus(404);
  }

  return res.send(chat);
}

// @desc    Add a conversation to the chat
// @route   POST /api/chat/:userId
// @access  Private

type ChatParams = {
  chatId: string;
};

export async function addConversationHandler(
  req: Request<ChatParams, {}, AddConversationInput["body"]>,
  res: Response
) {
  try {
    const { chatId } = req.params;

    const conversation = req.body;

    const chat = await findConversation(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.conversation.push(conversation);

    const updatedChat = await chat.save();

    res.status(200).send(updatedChat);
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
}

// @desc    Get a single chat from a user
// @route   GET /api/chat/:userId/:chatId
// @access  Private

// @desc    Updte a single chat from a user
// @route   PUT /api/chat/:userId/:chatId
// @access  Private
