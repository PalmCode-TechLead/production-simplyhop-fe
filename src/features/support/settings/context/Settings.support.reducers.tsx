import {
  SettingsSupportActionEnum,
  SettingsSupportActions,
  SettingsSupportFilters,
} from "./Settings.support.types";

// Filters
export const SettingsSupportFiltersReducers = (
  state: SettingsSupportFilters,
  action: SettingsSupportActions
) => {
  switch (action.type) {
    case SettingsSupportActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
