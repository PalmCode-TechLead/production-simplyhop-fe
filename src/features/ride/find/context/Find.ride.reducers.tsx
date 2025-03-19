import {
  FindRideActionEnum,
  FindRideActions,
  FindRideFilters,
} from "./Find.ride.types";

// Filters
export const FindRideFiltersReducers = (
  state: FindRideFilters,
  action: FindRideActions
) => {
  switch (action.type) {
    case FindRideActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
