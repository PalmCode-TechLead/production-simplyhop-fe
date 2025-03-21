import {
  LoginAuthActionEnum,
  LoginAuthActions,
  LoginAuthForm,
} from "./Login.auth.types";

// Form
export const LoginAuthFormReducers = (
  state: LoginAuthForm,
  action: LoginAuthActions
) => {
  switch (action.type) {
    case LoginAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};
