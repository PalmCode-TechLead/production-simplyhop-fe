import { AvatarProps } from "@/core/components/avatar";
import { BookingCardChatTripProps } from "../components/booking_card";
import { RideDetailCardChatTripProps } from "../components/ride_detail_card";
import { PriceCardChatTripProps } from "../components/price_card";

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
  offer: ChatTripOffer;
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
      booking_id: string;
      avatar: AvatarProps;
      name: string;
      message: string;
      date: string;
      isNew: boolean;
    }[];
  };
}

export interface ChatTripRoom {
  id: number | null;
  header: {
    name: string;
    avatar: AvatarProps;
  };
  booking: {
    status: string | null;
  };
  message: {
    items: {
      id: string;
      type: string;
      role: string;
      sender_id: string;
      time: string;
      name: string;
      avatar: AvatarProps;
      message: string;
      booking: BookingCardChatTripProps | null;
    }[];
  };
  chat: {
    input: {
      value: string;
    };
  };
}

export interface ChatTripOffer {
  is_open: boolean;
  form: {
    price_offer: {
      value: number;
    };
    notes: {
      value: string;
    };
  };
  ride: null | RideDetailCardChatTripProps;
  price: null | PriceCardChatTripProps;
  passenger: null | {
    adult: number;
    children: number;
  };
}

export enum ChatTripActionEnum {
  // List
  SetListData = "SetListData",
  // Room
  SetRoomData = "SetRoomData",
  // Offer
  SetOfferData = "SetOfferData",
}

// Action Collection Types
export type ChatTripActions =
  | ChatTripListActions
  | ChatTripRoomActions
  | ChatTripOfferActions;

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

// Offer
type ChatTripOfferPayload = {
  [ChatTripActionEnum.SetOfferData]: ChatTripOffer;
};

export type ChatTripOfferActions =
  ActionMap<ChatTripOfferPayload>[keyof ActionMap<ChatTripOfferPayload>];
