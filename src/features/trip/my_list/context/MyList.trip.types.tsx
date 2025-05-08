import { RideBookingListItemProps } from "@/core/components/ride_booking_list_item";
import { BookCardMyListTripProps } from "../components/book_card";
import { RideCardMyListTripProps } from "../components/ride_card";
import { BookDetailCardMyListTripProps } from "../components/book_detail_card";
import { CarPriceItemProps } from "@/core/components/car_price_item";

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
export interface MyListTripInitialStateType {
  filters: MyListTripFilters;
  ride: MyListTripRide;
  book: MyListTripBook;
  detail_ride_notification: MyListTripDetailRideNotification;
  delete_ride_notification: MyListTripDeleteRideNotification;
  success_delete_ride_notification: MyListTripSuccessDeleteRideNotification;
  share_ride_notification: MyListTripShareRideNotification;
}

// State Collection Types consist of:
export interface MyListTripFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export interface MyListTripRide {
  data: RideCardMyListTripProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail:
    | (RideCardMyListTripProps & {
        booking: RideBookingListItemProps[];
      })
    | null;
}

export interface MyListTripBook {
  data: BookCardMyListTripProps[];
  pagination: {
    current: number;
    last: null | number;
  };
  detail: (BookDetailCardMyListTripProps & { price: CarPriceItemProps }) | null;
}

export interface MyListTripDetailRideNotification {
  is_open: boolean;
}

export interface MyListTripDeleteRideNotification {
  is_open: boolean;
}

export interface MyListTripSuccessDeleteRideNotification {
  is_open: boolean;
}

export interface MyListTripShareRideNotification {
  is_open: boolean;
  share: {
    link: string;
  };
}

export enum MyListTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",

  // Ride
  SetRideData = "SetRideData",
  SetRideDataData = "SetRideDataData",
  SetRideDataPaginationCurrent = "SetRideDataPaginationCurrent",
  SetRideDataPaginationLast = "SetRideDataPaginationLast",

  // Book
  SetBookData = "SetBookData",
  SetBookDataData = "SetBookDataData",
  SetBookDataPaginationCurrent = "SetBookDataPaginationCurrent",
  SetBookDataPaginationLast = "SetBookDataPaginationLast",

  // DetailRideNotification
  SetDetailRideNotificationData = "SetDetailRideNotificationData",

  // DeleteRideNotification
  SetDeleteRideNotificationData = "SetDeleteRideNotificationData",

  // SuccessDeleteRideNotification
  SetSuccessDeleteRideNotificationData = "SetSuccessDeleteRideNotificationData",

  // ShareRideNotification
  SetShareRideNotificationData = "SetShareRideNotificationData",
}

// Action Collection Types
export type MyListTripActions =
  | MyListTripFiltersActions
  | MyListTripRideActions
  | MyListTripBookActions
  | MyListTripDetailRideNotificationActions
  | MyListTripDeleteRideNotificationActions
  | MyListTripSuccessDeleteRideNotificationActions
  | MyListTripShareRideNotificationActions;

// Action Collection Types consist of:
// Filters
type MyListTripFiltersPayload = {
  [MyListTripActionEnum.SetFiltersData]: MyListTripFilters;
};

export type MyListTripFiltersActions =
  ActionMap<MyListTripFiltersPayload>[keyof ActionMap<MyListTripFiltersPayload>];

// Ride
type MyListTripRidePayload = {
  [MyListTripActionEnum.SetRideData]: MyListTripRide;
  [MyListTripActionEnum.SetRideDataData]: MyListTripRide["data"];
  [MyListTripActionEnum.SetRideDataPaginationCurrent]: MyListTripRide["pagination"]["current"];
  [MyListTripActionEnum.SetRideDataPaginationLast]: MyListTripRide["pagination"]["last"];
};

export type MyListTripRideActions =
  ActionMap<MyListTripRidePayload>[keyof ActionMap<MyListTripRidePayload>];

// Book
type MyListTripBookPayload = {
  [MyListTripActionEnum.SetBookData]: MyListTripBook;
  [MyListTripActionEnum.SetBookDataData]: MyListTripBook["data"];
  [MyListTripActionEnum.SetBookDataPaginationCurrent]: MyListTripBook["pagination"]["current"];
  [MyListTripActionEnum.SetBookDataPaginationLast]: MyListTripBook["pagination"]["last"];
};

export type MyListTripBookActions =
  ActionMap<MyListTripBookPayload>[keyof ActionMap<MyListTripBookPayload>];

// DetailRideNotification
type MyListTripDetailRideNotificationPayload = {
  [MyListTripActionEnum.SetDetailRideNotificationData]: MyListTripDetailRideNotification;
};

export type MyListTripDetailRideNotificationActions =
  ActionMap<MyListTripDetailRideNotificationPayload>[keyof ActionMap<MyListTripDetailRideNotificationPayload>];

// DeleteRideNotification
type MyListTripDeleteRideNotificationPayload = {
  [MyListTripActionEnum.SetDeleteRideNotificationData]: MyListTripDeleteRideNotification;
};

export type MyListTripDeleteRideNotificationActions =
  ActionMap<MyListTripDeleteRideNotificationPayload>[keyof ActionMap<MyListTripDeleteRideNotificationPayload>];

// SuccessDeleteRideNotification
type MyListTripSuccessDeleteRideNotificationPayload = {
  [MyListTripActionEnum.SetSuccessDeleteRideNotificationData]: MyListTripSuccessDeleteRideNotification;
};

export type MyListTripSuccessDeleteRideNotificationActions =
  ActionMap<MyListTripSuccessDeleteRideNotificationPayload>[keyof ActionMap<MyListTripSuccessDeleteRideNotificationPayload>];

// ShareRideNotification
type MyListTripShareRideNotificationPayload = {
  [MyListTripActionEnum.SetShareRideNotificationData]: MyListTripShareRideNotification;
};

export type MyListTripShareRideNotificationActions =
  ActionMap<MyListTripShareRideNotificationPayload>[keyof ActionMap<MyListTripShareRideNotificationPayload>];
