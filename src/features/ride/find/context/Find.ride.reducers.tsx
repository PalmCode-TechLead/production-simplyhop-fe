import {
  FindRideActionEnum,
  FindRideActions,
  FindRideFilters,
  FindRideMap,
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

// Map
export const FindRideMapReducers = (
  state: FindRideMap,
  action: FindRideActions
) => {
  switch (action.type) {
    case FindRideActionEnum.SetMapData:
      return action.payload;

    default:
      return state;
  }
};
