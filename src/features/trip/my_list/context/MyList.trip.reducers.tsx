import {
  MyListTripActionEnum,
  MyListTripActions,
  MyListTripFilters,
} from "./MyList.trip.types";

// Filters
export const MyListTripFiltersReducers = (
  state: MyListTripFilters,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
