import {
  ChatTripActionEnum,
  ChatTripActions,
  ChatTripFilters,
  ChatTripMap,
} from "./Chat.trip.types";

// Filters
export const ChatTripFiltersReducers = (
  state: ChatTripFilters,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Map
export const ChatTripMapReducers = (state: ChatTripMap, action: ChatTripActions) => {
  switch (action.type) {
    case ChatTripActionEnum.SetMapData:
      return action.payload;

    default:
      return state;
  }
};
