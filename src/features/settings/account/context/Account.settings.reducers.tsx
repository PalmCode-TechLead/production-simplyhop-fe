import {
  AccountSettingsActionEnum,
  AccountSettingsActions,
  AccountSettingsFilters,
} from "./Account.settings.types";

// Filters
export const AccountSettingsFiltersReducers = (
  state: AccountSettingsFilters,
  action: AccountSettingsActions
) => {
  switch (action.type) {
    case AccountSettingsActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
