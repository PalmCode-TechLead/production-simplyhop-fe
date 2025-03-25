import {
  SettingsSupportActionEnum,
  SettingsSupportActions,
  SettingsSupportDeactivate,
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
