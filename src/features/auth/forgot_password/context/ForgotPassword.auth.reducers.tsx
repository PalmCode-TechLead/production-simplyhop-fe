import {
  ForgotPasswordAuthActionEnum,
  ForgotPasswordAuthActions,
  ForgotPasswordAuthForm,
  ForgotPasswordAuthState,
} from "./ForgotPassword.auth.types";

// State
export const ForgotPasswordAuthStateReducers = (
  state: ForgotPasswordAuthState,
  action: ForgotPasswordAuthActions
) => {
  switch (action.type) {
    case ForgotPasswordAuthActionEnum.SetStateData:
      return action.payload;

    default:
      return state;
  }
};

// Form
export const ForgotPasswordAuthFormReducers = (
  state: ForgotPasswordAuthForm,
  action: ForgotPasswordAuthActions
) => {
  switch (action.type) {
    case ForgotPasswordAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};
