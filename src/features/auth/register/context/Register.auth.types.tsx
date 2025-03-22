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
export interface RegisterAuthInitialStateType {
  form: RegisterAuthForm;
}

// State Collection Types consist of:
export interface RegisterAuthForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export enum RegisterAuthActionEnum {
  // Form
  SetFormData = "SetFormData",
}

// Action Collection Types
export type RegisterAuthActions = RegisterAuthFormActions;

// Action Collection Types consist of:
// Form
type RegisterAuthFormPayload = {
  [RegisterAuthActionEnum.SetFormData]: RegisterAuthForm;
};

export type RegisterAuthFormActions =
  ActionMap<RegisterAuthFormPayload>[keyof ActionMap<RegisterAuthFormPayload>];
