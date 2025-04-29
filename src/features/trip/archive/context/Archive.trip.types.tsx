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

  detail:
    | (RideCardArchiveTripProps & {
        booking: RideBookingListItemProps[];
      })
    | null;
}

export interface ArchiveTripBook {
  data: BookCardArchiveTripProps[];
  list: {
    page_number: number;
    is_end_reached: boolean;
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

  // Book
  SetBookData = "SetBookData",
}

// Action Collection Types
export type ArchiveTripActions =
  | ArchiveTripFiltersActions
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
};

export type ArchiveTripRideActions =
  ActionMap<ArchiveTripRidePayload>[keyof ActionMap<ArchiveTripRidePayload>];

// Book
type ArchiveTripBookPayload = {
  [ArchiveTripActionEnum.SetBookData]: ArchiveTripBook;
};

export type ArchiveTripBookActions =
  ActionMap<ArchiveTripBookPayload>[keyof ActionMap<ArchiveTripBookPayload>];
