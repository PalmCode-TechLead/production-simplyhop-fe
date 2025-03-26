import {
  RegistrationProfileActionEnum,
  RegistrationProfileActions,
  RegistrationProfileNotification,
  RegistrationProfilePersonalInformation,
  RegistrationProfileRidePlan,
  RegistrationProfileTab,
  RegistrationProfileVehicleInformation,
} from "./Registration.profile.types";

// Tab
export const RegistrationProfileTabReducers = (
  state: RegistrationProfileTab,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetTabData:
      return action.payload;

    default:
      return state;
  }
};

// PersonalInformation
export const RegistrationProfilePersonalInformationReducers = (
  state: RegistrationProfilePersonalInformation,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetPersonalInformationData:
      return action.payload;

    default:
      return state;
  }
};

// RidePlan
export const RegistrationProfileRidePlanReducers = (
  state: RegistrationProfileRidePlan,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetRidePlanData:
      return action.payload;

    default:
      return state;
  }
};

// VehicleInformation
export const RegistrationProfileVehicleInformationReducers = (
  state: RegistrationProfileVehicleInformation,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetVehicleInformationData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const RegistrationProfileNotificationReducers = (
  state: RegistrationProfileNotification,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};
