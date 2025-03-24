import {
  ResultTripActionEnum,
  ResultTripActions,
  ResultTripAdvancedFilter,
  ResultTripDetail,
  ResultTripFilters,
  ResultTripNotification,
  ResultTripRides,
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

// Rides
export const ResultTripRidesReducers = (
  state: ResultTripRides,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetRidesData:
      return action.payload;

    default:
      return state;
  }
};

// Detail
export const ResultTripDetailReducers = (
  state: ResultTripDetail,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetDetailData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const ResultTripNotificationReducers = (
  state: ResultTripNotification,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
