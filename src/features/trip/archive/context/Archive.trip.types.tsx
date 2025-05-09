import { CarPriceItemProps } from "@/core/components/car_price_item";
import { BookCardArchiveTripProps } from "../components/book_card";
import { BookDetailCardArchiveTripProps } from "../components/book_detail_card";
import { RideCardArchiveTripProps } from "../components/ride_card";
import { RideBookingListItemProps } from "@/core/components/ride_booking_list_item";

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
export interface ArchiveTripInitialStateType {
  filters: ArchiveTripFilters;
  ride: ArchiveTripRide;
  ride_detail: ArchiveTripRideDetail;
  book: ArchiveTripBook;
}

// State Collection Types consist of:
export interface ArchiveTripFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export interface ArchiveTripRide {
  data: RideCardArchiveTripProps[];
  pagination: {
    current: number;
    last: number | null;
  };
}

export interface ArchiveTripRideDetail {
  data:
    | (RideCardArchiveTripProps & {
        booking: RideBookingListItemProps[];
      })
    | null;
}

export interface ArchiveTripBook {
  data: BookCardArchiveTripProps[];
  pagination: {
    current: number;
    last: number | null;
  };
  detail:
    | (BookDetailCardArchiveTripProps & { price: CarPriceItemProps })
    | null;
}

export enum ArchiveTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",

  // Ride
  SetRideData = "SetRideData",
  SetRideDataData = "SetRideDataData",
  SetRideDataPaginationCurrent = "SetRideDataPaginationCurrent",
  SetRideDataPaginationLast = "SetRideDataPaginationLast",

  // RideDetail
  SetRideDetailData = "SetRideDetailData",

  // Book
  SetBookData = "SetBookData",
  SetBookDataData = "SetBookDataData",
  SetBookDataPaginationCurrent = "SetBookDataPaginationCurrent",
  SetBookDataPaginationLast = "SetBookDataPaginationLast",
}

// Action Collection Types
export type ArchiveTripActions =
  | ArchiveTripFiltersActions
  | ArchiveTripRideDetailActions
  | ArchiveTripRideActions
  | ArchiveTripBookActions;

// Action Collection Types consist of:
// Filters
type ArchiveTripFiltersPayload = {
  [ArchiveTripActionEnum.SetFiltersData]: ArchiveTripFilters;
};

export type ArchiveTripFiltersActions =
  ActionMap<ArchiveTripFiltersPayload>[keyof ActionMap<ArchiveTripFiltersPayload>];

// Ride
type ArchiveTripRidePayload = {
  [ArchiveTripActionEnum.SetRideData]: ArchiveTripRide;
  [ArchiveTripActionEnum.SetRideDataData]: ArchiveTripRide["data"];
  [ArchiveTripActionEnum.SetRideDataPaginationCurrent]: ArchiveTripRide["pagination"]["current"];
  [ArchiveTripActionEnum.SetRideDataPaginationLast]: ArchiveTripRide["pagination"]["last"];
};

export type ArchiveTripRideActions =
  ActionMap<ArchiveTripRidePayload>[keyof ActionMap<ArchiveTripRidePayload>];

//RideDetail
type ArchiveTripRideDetailPayload = {
  [ArchiveTripActionEnum.SetRideDetailData]: ArchiveTripRideDetail;
};

export type ArchiveTripRideDetailActions =
  ActionMap<ArchiveTripRideDetailPayload>[keyof ActionMap<ArchiveTripRideDetailPayload>];

// Book
type ArchiveTripBookPayload = {
  [ArchiveTripActionEnum.SetBookData]: ArchiveTripBook;
  [ArchiveTripActionEnum.SetBookDataData]: ArchiveTripBook["data"];
  [ArchiveTripActionEnum.SetBookDataPaginationCurrent]: ArchiveTripBook["pagination"]["current"];
  [ArchiveTripActionEnum.SetBookDataPaginationLast]: ArchiveTripBook["pagination"]["last"];
};

export type ArchiveTripBookActions =
  ActionMap<ArchiveTripBookPayload>[keyof ActionMap<ArchiveTripBookPayload>];
