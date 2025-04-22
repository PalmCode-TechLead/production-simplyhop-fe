import {
  VehiclesSupportActionEnum,
  VehiclesSupportActions,
  VehiclesSupportList,
} from "./Vehicles.support.types";

// List
export const VehiclesSupportListReducers = (
  state: VehiclesSupportList,
  action: VehiclesSupportActions
) => {
  switch (action.type) {
    case VehiclesSupportActionEnum.SetListData:
      return action.payload;

    default:
      return state;
  }
};
