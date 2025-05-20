import { FormError } from "@/core/utils/form";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface ForgotPasswordAuthInitialStateType {
  state: ForgotPasswordAuthState;
  form: ForgotPasswordAuthForm;
}

// State Collection Types consist of:
export interface ForgotPasswordAuthState {
  step: "form" | "success";
}
export interface ForgotPasswordAuthForm {
  email: {
    value: string;
    error: FormError;
  };
}

export enum ForgotPasswordAuthActionEnum {
  // State
  SetStateData = "SetStateData",
  // Form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type ForgotPasswordAuthActions =
  | ForgotPasswordAuthStateActions
  | ForgotPasswordAuthFormActions;

// Action Collection Types consist of:
// State
type ForgotPasswordAuthStatePayload = {
  [ForgotPasswordAuthActionEnum.SetStateData]: ForgotPasswordAuthState;
};

export type ForgotPasswordAuthStateActions =
  ActionMap<ForgotPasswordAuthStatePayload>[keyof ActionMap<ForgotPasswordAuthStatePayload>];

// Form
type ForgotPasswordAuthFormPayload = {
  [ForgotPasswordAuthActionEnum.SetFormData]: ForgotPasswordAuthForm;
};

export type ForgotPasswordAuthFormActions =
  ActionMap<ForgotPasswordAuthFormPayload>[keyof ActionMap<ForgotPasswordAuthFormPayload>];
