import {
  ResultTripActionEnum,
  ResultTripActions,
  ResultTripAdvancedFilter,
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

// AdvancedFilter
export const ResultTripAdvancedFilterReducers = (
  state: ResultTripAdvancedFilter,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetAdvancedFilterData:
      return action.payload;

    default:
      return state;
  }
};
