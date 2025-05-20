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
export interface ResetPasswordAuthInitialStateType {
  state: ResetPasswordAuthState;
  form: ResetPasswordAuthForm;
}

// State Collection Types consist of:
export interface ResetPasswordAuthState {
  step: "form" | "success";
}
export interface ResetPasswordAuthForm {
  password: {
    value: string;
    error: FormError;
  };
  password_confirmation: {
    value: string;
    error: FormError;
  };
  tnc: {
    checked: boolean;
  };
}

export enum ResetPasswordAuthActionEnum {
  // State
  SetStateData = "SetStateData",
  // Form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type ResetPasswordAuthActions =
  | ResetPasswordAuthStateActions
  | ResetPasswordAuthFormActions;

// Action Collection Types consist of:
// State
type ResetPasswordAuthStatePayload = {
  [ResetPasswordAuthActionEnum.SetStateData]: ResetPasswordAuthState;
};

export type ResetPasswordAuthStateActions =
  ActionMap<ResetPasswordAuthStatePayload>[keyof ActionMap<ResetPasswordAuthStatePayload>];

// Form
type ResetPasswordAuthFormPayload = {
  [ResetPasswordAuthActionEnum.SetFormData]: ResetPasswordAuthForm;
};

export type ResetPasswordAuthFormActions =
  ActionMap<ResetPasswordAuthFormPayload>[keyof ActionMap<ResetPasswordAuthFormPayload>];
