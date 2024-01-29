import axios from "axios";
import { chatType, conversationType } from "../../types/chatType";
import * as tokenService from "../../utils/tokenService";

const headers = tokenService.setAuthHeaders();

// create new chat
const createChat = async (chatData: chatType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/chat`,
      chatData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("error on createChat", error);
  }
};

//REVIEW -
// get all chat from user
// const getAllReceivedUserChat = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_ENDPOINT}/api/chat/received`,
//       { withCredentials: true }
//     );
//     console.log("response", response);
//     return response.data;
//   } catch (error) {
//     console.log("error on getAllReceivedUserChat", error);
//   }
// };
const getAllReceivedUserChat = async () => {
  try {
    // Make the GET request with the custom headers
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/api/chat/received`,
      { headers }
    );

    console.log("response getAllReceivedUserChat", response);
    return response.data;
  } catch (error) {
    console.log("error on getAllReceivedUserChat", error);
  }
};

// get all chat from user
const getAllSentUserChat = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/api/chat/sent`,
      { headers }
    );
    console.log("response getAllSentUserChat", response);
    return response.data;
  } catch (error) {
    console.log("error on getAllSentUserChat", error);
  }
};

// add conversation
const addConversation = async (
  // conversationData: Omit<conversationType, "telephone">,
  conversationData: conversationType,
  chatId: string
) => {
  try {
    console.log("conversationData", conversationData);
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/api/chat/${chatId}`,
      conversationData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("error on addConversation", error);
  }
};

const chatService = {
  createChat,
  getAllReceivedUserChat,
  addConversation,
  getAllSentUserChat,
};

export default chatService;
