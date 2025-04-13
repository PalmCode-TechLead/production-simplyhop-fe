type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface AccountUpdateSupportInitialStateType {
  deactivate: AccountUpdateSupportDeactivate;
  deactivate_confirmation: AccountUpdateSupportDeactivateConfirmation;
  deactivate_notification: AccountUpdateSupportDeactivateNotification;
}

// State Collection Types consist of:
export interface AccountUpdateSupportDeactivate {
  is_open: boolean;
}

export interface AccountUpdateSupportDeactivateConfirmation {
  is_open: boolean;
  form: {
    password: {
      value: string;
    };
  };
}

export interface AccountUpdateSupportDeactivateNotification {
  is_open: boolean;
}

export enum AccountUpdateSupportActionEnum {
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
  // DeactivateConfirmation
  SetDeactivateConfirmationData = "SetDeactivateConfirmationData",
  // DeactivateNotification
  SetDeactivateNotificationData = "SetDeactivateNotificationData",
}

// Action Collection Types
export type AccountUpdateSupportActions =
  | AccountUpdateSupportDeactivateActions
  | AccountUpdateSupportDeactivateConfirmationActions
  | AccountUpdateSupportDeactivateNotificationActions;

// Action Collection Types consist of:
// Deactivate
type AccountUpdateSupportDeactivatePayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateData]: AccountUpdateSupportDeactivate;
};

export type AccountUpdateSupportDeactivateActions =
  ActionMap<AccountUpdateSupportDeactivatePayload>[keyof ActionMap<AccountUpdateSupportDeactivatePayload>];

// DeactivateConfirmation
type AccountUpdateSupportDeactivateConfirmationPayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateConfirmationData]: AccountUpdateSupportDeactivateConfirmation;
};

export type AccountUpdateSupportDeactivateConfirmationActions =
  ActionMap<AccountUpdateSupportDeactivateConfirmationPayload>[keyof ActionMap<AccountUpdateSupportDeactivateConfirmationPayload>];

// DeactivateNotification
type AccountUpdateSupportDeactivateNotificationPayload = {
  [AccountUpdateSupportActionEnum.SetDeactivateNotificationData]: AccountUpdateSupportDeactivateNotification;
};

export type AccountUpdateSupportDeactivateNotificationActions =
  ActionMap<AccountUpdateSupportDeactivateNotificationPayload>[keyof ActionMap<AccountUpdateSupportDeactivateNotificationPayload>];
