import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportActions,
  VehicleUpdateSupportDeleteNotification,
  VehicleUpdateSupportNotification,
  VehicleUpdateSupportSuccessDeleteNotification,
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

// DeleteNotification
export const VehicleUpdateSupportDeleteNotificationReducers = (
  state: VehicleUpdateSupportDeleteNotification,
  action: VehicleUpdateSupportActions
) => {
  switch (action.type) {
    case VehicleUpdateSupportActionEnum.SetDeleteNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessDeleteNotification
export const VehicleUpdateSupportSuccessDeleteNotificationReducers = (
  state: VehicleUpdateSupportSuccessDeleteNotification,
  action: VehicleUpdateSupportActions
) => {
  switch (action.type) {
    case VehicleUpdateSupportActionEnum.SetSuccessDeleteNotificationData:
      return action.payload;

    default:
      return state;
  }
};
