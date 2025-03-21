import {
  ChatTripActionEnum,
  ChatTripActions,
  ChatTripList,
  ChatTripConversation,
} from "./Chat.trip.types";

// List
export const ChatTripListReducers = (
  state: ChatTripList,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetListData:
      return action.payload;

    default:
      return state;
  }
};

// Conversation
export const ChatTripConversationReducers = (
  state: ChatTripConversation,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetConversationData:
      return action.payload;

    default:
      return state;
  }
};
