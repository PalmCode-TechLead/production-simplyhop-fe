import {
  VehicleSupportActionEnum,
  VehicleSupportActions,
  VehicleSupportFilters,
} from "./Vehicle.support.types";

// Filters
export const VehicleSupportFiltersReducers = (
  state: VehicleSupportFilters,
  action: VehicleSupportActions
) => {
  switch (action.type) {
    case VehicleSupportActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
