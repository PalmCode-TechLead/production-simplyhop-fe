import {
  ResetPasswordAuthActionEnum,
  ResetPasswordAuthActions,
  ResetPasswordAuthForm,
  ResetPasswordAuthState,
} from "./ResetPassword.auth.types";

// State
export const ResetPasswordAuthStateReducers = (
  state: ResetPasswordAuthState,
  action: ResetPasswordAuthActions
) => {
  switch (action.type) {
    case ResetPasswordAuthActionEnum.SetStateData:
      return action.payload;

    default:
      return state;
  }
};

// Form
export const ResetPasswordAuthFormReducers = (
  state: ResetPasswordAuthForm,
  action: ResetPasswordAuthActions
) => {
  switch (action.type) {
    case ResetPasswordAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};
