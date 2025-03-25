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
export interface SettingsSupportInitialStateType {
  deactivate: SettingsSupportDeactivate;
  deactivate_confirmation: SettingsSupportDeactivateConfirmation;
  deactivate_notification: SettingsSupportDeactivateNotification;
}

// State Collection Types consist of:
export interface SettingsSupportDeactivate {
  is_open: boolean;
}

export interface SettingsSupportDeactivateConfirmation {
  is_open: boolean;
  form: {
    password: {
      value: string;
    };
  };
}

export interface SettingsSupportDeactivateNotification {
  is_open: boolean;
}

export enum SettingsSupportActionEnum {
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
  // DeactivateConfirmation
  SetDeactivateConfirmationData = "SetDeactivateConfirmationData",
  // DeactivateNotification
  SetDeactivateNotificationData = "SetDeactivateNotificationData",
}

// Action Collection Types
export type SettingsSupportActions =
  | SettingsSupportDeactivateActions
  | SettingsSupportDeactivateConfirmationActions
  | SettingsSupportDeactivateNotificationActions;

// Action Collection Types consist of:
// Deactivate
type SettingsSupportDeactivatePayload = {
  [SettingsSupportActionEnum.SetDeactivateData]: SettingsSupportDeactivate;
};

export type SettingsSupportDeactivateActions =
  ActionMap<SettingsSupportDeactivatePayload>[keyof ActionMap<SettingsSupportDeactivatePayload>];

// DeactivateConfirmation
type SettingsSupportDeactivateConfirmationPayload = {
  [SettingsSupportActionEnum.SetDeactivateConfirmationData]: SettingsSupportDeactivateConfirmation;
};

export type SettingsSupportDeactivateConfirmationActions =
  ActionMap<SettingsSupportDeactivateConfirmationPayload>[keyof ActionMap<SettingsSupportDeactivateConfirmationPayload>];

// DeactivateNotification
type SettingsSupportDeactivateNotificationPayload = {
  [SettingsSupportActionEnum.SetDeactivateNotificationData]: SettingsSupportDeactivateNotification;
};

export type SettingsSupportDeactivateNotificationActions =
  ActionMap<SettingsSupportDeactivateNotificationPayload>[keyof ActionMap<SettingsSupportDeactivateNotificationPayload>];
