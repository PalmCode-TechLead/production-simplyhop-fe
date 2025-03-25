import {
  AccountSupportActionEnum,
  AccountSupportActions,
  AccountSupportDeactivate,
  AccountSupportDeactivateConfirmation,
  AccountSupportDeactivateNotification,
} from "./Account.support.types";

// Deactivate
export const AccountSupportDeactivateReducers = (
  state: AccountSupportDeactivate,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateConfirmation
export const AccountSupportDeactivateConfirmationReducers = (
  state: AccountSupportDeactivateConfirmation,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeactivateNotification
export const AccountSupportDeactivateNotificationReducers = (
  state: AccountSupportDeactivateNotification,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetDeactivateNotificationData:
      return action.payload;

    default:
      return state;
  }
};
