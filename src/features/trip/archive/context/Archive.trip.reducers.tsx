import {
  ArchiveTripActionEnum,
  ArchiveTripActions,
  ArchiveTripBook,
  ArchiveTripFilters,
  ArchiveTripRide,
} from "./Archive.trip.types";

// Filters
export const ArchiveTripFiltersReducers = (
  state: ArchiveTripFilters,
  action: ArchiveTripActions
) => {
  switch (action.type) {
    case ArchiveTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Ride
export const ArchiveTripRideReducers = (
  state: ArchiveTripRide,
  action: ArchiveTripActions
) => {
  switch (action.type) {
    case ArchiveTripActionEnum.SetRideData:
      return action.payload;

    default:
      return state;
  }
};

// Book
export const ArchiveTripBookReducers = (
  state: ArchiveTripBook,
  action: ArchiveTripActions
) => {
  switch (action.type) {
    case ArchiveTripActionEnum.SetBookData:
      return action.payload;

    default:
      return state;
  }
};
