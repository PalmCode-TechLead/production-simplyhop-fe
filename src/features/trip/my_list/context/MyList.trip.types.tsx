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
  delete_ride_notification: MyListTripDeleteRideNotification;
  success_delete_ride_notification: MyListTripSuccessDeleteRideNotification;
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

export interface MyListTripDeleteRideNotification {
  is_open: boolean;
}

export interface MyListTripSuccessDeleteRideNotification {
  is_open: boolean;
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

  // DeleteRideNotification
  SetDeleteRideNotificationData = "SetDeleteRideNotificationData",

  // SuccessDeleteRideNotification
  SetSuccessDeleteRideNotificationData = "SetSuccessDeleteRideNotificationData",
}

// Action Collection Types
export type MyListTripActions =
  | MyListTripFiltersActions
  | MyListTripRideActions
  | MyListTripBookActions
  | MyListTripDeleteRideNotificationActions
  | MyListTripSuccessDeleteRideNotificationActions;

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
