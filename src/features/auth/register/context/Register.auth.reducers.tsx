import {
  RegisterAuthActionEnum,
  RegisterAuthActions,
  RegisterAuthGeneral,
  RegisterAuthPasswordSetup,
  RegisterAuthState,
} from "./Register.auth.types";

// State
export const RegisterAuthStateReducers = (
  state: RegisterAuthState,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetStateData:
      return action.payload;

    default:
      return state;
  }
};

// General
export const RegisterAuthGeneralReducers = (
  state: RegisterAuthGeneral,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetGeneralData:
      return action.payload;

    default:
      return state;
  }
};

// PasswordSetup
export const RegisterAuthPasswordSetupReducers = (
  state: RegisterAuthPasswordSetup,
  action: RegisterAuthActions
) => {
  switch (action.type) {
    case RegisterAuthActionEnum.SetPasswordSetupData:
      return action.payload;

    default:
      return state;
  }
};
