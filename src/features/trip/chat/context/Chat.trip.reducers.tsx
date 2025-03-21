import {
  ChatTripActionEnum,
  ChatTripActions,
  ChatTripList,
  ChatTripRoom,
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

// Room
export const ChatTripRoomReducers = (
  state: ChatTripRoom,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetRoomData:
      return action.payload;

    default:
      return state;
  }
};
