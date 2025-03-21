import {
  ResultTripActionEnum,
  ResultTripActions,
  ResultTripFilters,
} from "./Result.trip.types";

// Filters
export const ResultTripFiltersReducers = (
  state: ResultTripFilters,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
