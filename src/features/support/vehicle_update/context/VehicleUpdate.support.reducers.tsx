import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportActions,
  VehicleUpdateSupportNotification,
  VehicleUpdateSupportVehicleInformation,
} from "./VehicleUpdate.support.types";

// VehicleInformation
export const VehicleUpdateSupportVehicleInformationReducers = (
  state: VehicleUpdateSupportVehicleInformation,
  action: VehicleUpdateSupportActions
) => {
  switch (action.type) {
    case VehicleUpdateSupportActionEnum.SetVehicleInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const VehicleUpdateSupportNotificationReducers = (
  state: VehicleUpdateSupportNotification,
  action: VehicleUpdateSupportActions
) => {
  switch (action.type) {
    case VehicleUpdateSupportActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
