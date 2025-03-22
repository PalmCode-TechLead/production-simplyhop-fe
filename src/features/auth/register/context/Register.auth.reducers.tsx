import {
  RegisterAuthActionEnum,
  RegisterAuthActions,
  RegisterAuthForm,
} from "./Register.auth.types";

// Form
export const RegisterAuthFormReducers = (
  state: RegisterAuthForm,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetFormData:
      return action.payload;

    default:
      return state;
  }
};
