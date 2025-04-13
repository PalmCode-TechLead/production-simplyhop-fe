import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportActions,
  AccountUpdateSupportDeactivate,
  AccountUpdateSupportDeactivateConfirmation,
  AccountUpdateSupportDeactivateNotification,
} from "./AccountUpdate.support.types";

// Deactivate
export const AccountUpdateSupportDeactivateReducers = (
  state: AccountUpdateSupportDeactivate,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateConfirmation
export const AccountUpdateSupportDeactivateConfirmationReducers = (
  state: AccountUpdateSupportDeactivateConfirmation,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateNotification
export const AccountUpdateSupportDeactivateNotificationReducers = (
  state: AccountUpdateSupportDeactivateNotification,
  action: AccountUpdateSupportActions
) => {
  switch (action.type) {
    case AccountUpdateSupportActionEnum.SetDeactivateNotificationData:
      return action.payload;

    default:
      return state;
  }
};
