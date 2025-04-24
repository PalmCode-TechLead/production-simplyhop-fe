import { CustomerOrderCardChatTripProps } from "../components/customer_order_card";
import { DriverOrderCardChatTripProps } from "../components/driver_order_card";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface ChatTripInitialStateType {
  list: ChatTripList;
  room: ChatTripRoom;
}

// State Collection Types consist of:
export interface ChatTripList {
  search: {
    value: string;
  };
  tab: {
    selected: { id: string; name: string } | null;
  };
  message: {
    items: {
      id: string;
      image_url: string;
      name: string;
      message: string;
      date: string;
    }[];
  };
}

export interface ChatTripRoom {
  message: {
    items: {
      id: string;
      type: string;
      role: string;
      time: string;
      name: string;
      image: {
        src: string;
        width: number;
        height: number;
        alt: string;
      };
      message: string;
      booking: CustomerOrderCardChatTripProps | null;
    }[];
  };
  chat: {
    input: {
      value: string;
    };
  };
}

export enum ChatTripActionEnum {
  // List
  SetListData = "SetListData",
  // Room
  SetRoomData = "SetRoomData",
}

// Action Collection Types
export type ChatTripActions = ChatTripListActions | ChatTripRoomActions;

// Action Collection Types consist of:
// List
type ChatTripListPayload = {
  [ChatTripActionEnum.SetListData]: ChatTripList;
};

export type ChatTripListActions =
  ActionMap<ChatTripListPayload>[keyof ActionMap<ChatTripListPayload>];

// Room
type ChatTripRoomPayload = {
  [ChatTripActionEnum.SetRoomData]: ChatTripRoom;
};

export type ChatTripRoomActions =
  ActionMap<ChatTripRoomPayload>[keyof ActionMap<ChatTripRoomPayload>];
