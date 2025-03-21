import {
  AccountSupportActionEnum,
  AccountSupportActions,
  AccountSupportFilters,
} from "./Account.support.types";

// Filters
export const AccountSupportFiltersReducers = (
  state: AccountSupportFilters,
  action: AccountSupportActions
) => {
  switch (action.type) {
    case AccountSupportActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
