import {
  ChatTripActionEnum,
  ChatTripActions,
  ChatTripList,
  ChatTripRoom,
  ChatTripOffer,
} from "./Chat.trip.types";

// List
export const ChatTripListReducers = (
  state: ChatTripList,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetListData:
      return action.payload;
    case ChatTripActionEnum.SetListMessageItems: {
      return {
        ...state,
        message: {
          ...state.message,
          items: action.payload,
        },
      };
    }
    case ChatTripActionEnum.SetListMessagePaginationCurrent: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            current: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetListMessagePaginationLast: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            last: action.payload,
          },
        },
      };
    }

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
    case ChatTripActionEnum.SetRoomBookingStatus: {
      return {
        ...state,
        booking: {
          ...state.booking,
          status: action.payload,
        },
      };
    }

    case ChatTripActionEnum.SetRoomMessageItems: {
      return {
        ...state,
        message: {
          ...state.message,
          items: action.payload,
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationCurrent: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            current: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationLast: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            last: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationIsRefetch: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            is_refetch: action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Offer
export const ChatTripOfferReducers = (
  state: ChatTripOffer,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetOfferData:
      return action.payload;

    default:
      return state;
  }
};
