import {
  PlanRideTripActionEnum,
  PlanRideTripActions,
  PlanRideTripFilters,
  PlanRideTripMap,
} from "./PlanRide.trip.types";

// Filters
export const PlanRideTripFiltersReducers = (
  state: PlanRideTripFilters,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Map
export const PlanRideTripMapReducers = (
  state: PlanRideTripMap,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetMapData:
      return action.payload;

    default:
      return state;
  }
};
