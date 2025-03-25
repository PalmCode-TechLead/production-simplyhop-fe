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
}

// State Collection Types consist of:
export interface SettingsSupportDeactivate {
  is_open: boolean;
}

export enum SettingsSupportActionEnum {
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
}

// Action Collection Types
export type SettingsSupportActions = SettingsSupportDeactivateActions;

// Action Collection Types consist of:
// Deactivate
type SettingsSupportDeactivatePayload = {
  [SettingsSupportActionEnum.SetDeactivateData]: SettingsSupportDeactivate;
};

export type SettingsSupportDeactivateActions =
  ActionMap<SettingsSupportDeactivatePayload>[keyof ActionMap<SettingsSupportDeactivatePayload>];
