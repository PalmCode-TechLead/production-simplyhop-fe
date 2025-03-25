import {
  AccountSupportActionEnum,
  AccountSupportActions,
  AccountSupportDeactivate,
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
