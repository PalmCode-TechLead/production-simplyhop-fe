import {
  LoginAuthActionEnum,
  LoginAuthActions,
  LoginAuthFilters,
} from "./Login.auth.types";

// Filters
export const LoginAuthFiltersReducers = (
  state: LoginAuthFilters,
  action: LoginAuthActions
) => {
  switch (action.type) {
    case LoginAuthActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};
