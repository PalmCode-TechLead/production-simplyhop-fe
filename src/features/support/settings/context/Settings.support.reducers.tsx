import {
  SettingsSupportActionEnum,
  SettingsSupportActions,
  SettingsSupportChangePassword,
  SettingsSupportDeactivate,
  SettingsSupportDeactivateConfirmation,
  SettingsSupportDeactivateNotification,
} from "./Settings.support.types";

// Deactivate
export const SettingsSupportDeactivateReducers = (
  state: SettingsSupportDeactivate,
  action: SettingsSupportActions
) => {
  switch (action.type) {
    case SettingsSupportActionEnum.SetDeactivateData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateConfirmation
export const SettingsSupportDeactivateConfirmationReducers = (
  state: SettingsSupportDeactivateConfirmation,
  action: SettingsSupportActions
) => {
  switch (action.type) {
    case SettingsSupportActionEnum.SetDeactivateConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateNotification
export const SettingsSupportDeactivateNotificationReducers = (
  state: SettingsSupportDeactivateNotification,
  action: SettingsSupportActions
) => {
  switch (action.type) {
    case SettingsSupportActionEnum.SetDeactivateNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// ChangePassword
export const SettingsSupportChangePasswordReducers = (
  state: SettingsSupportChangePassword,
  action: SettingsSupportActions
) => {
  switch (action.type) {
    case SettingsSupportActionEnum.SetChangePasswordData:
      return action.payload;

    default:
      return state;
  }
};
