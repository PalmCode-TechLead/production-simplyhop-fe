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
  state: RegisterAuthState;
  general: RegisterAuthGeneral;
  password_setup: RegisterAuthPasswordSetup;
}

// State Collection Types consist of:
export interface RegisterAuthState {
  step: "general" | "password_setup";
}
export interface RegisterAuthGeneral {
  email: {
    value: string;
    error: null | {
      id: string;
      name: string;
    };
  };
}

export interface RegisterAuthPasswordSetup {
  email: {
    value: string;
  };
  password: {
    value: string;
    error: null | {
      id: string;
      name: string;
    };
  };
  confirm_password: {
    value: string;
    error: null | {
      id: string;
      name: string;
    };
  };
  tnc: {
    checked: boolean;
  };
}

export enum RegisterAuthActionEnum {
  // State
  SetStateData = "SetStateData",
  // General
  SetGeneralData = "SetGeneralData",
  // PasswordSetup
  SetPasswordSetupData = "SetPasswordSetupData",
}

// Action Collection Types
export type RegisterAuthActions =
  | RegisterAuthStateActions
  | RegisterAuthGeneralActions
  | RegisterAuthPasswordSetupActions;

// Action Collection Types consist of:
// State
type RegisterAuthStatePayload = {
  [RegisterAuthActionEnum.SetStateData]: RegisterAuthState;
};

export type RegisterAuthStateActions =
  ActionMap<RegisterAuthStatePayload>[keyof ActionMap<RegisterAuthStatePayload>];

// General
type RegisterAuthGeneralPayload = {
  [RegisterAuthActionEnum.SetGeneralData]: RegisterAuthGeneral;
};

export type RegisterAuthGeneralActions =
  ActionMap<RegisterAuthGeneralPayload>[keyof ActionMap<RegisterAuthGeneralPayload>];

// PasswordSetup
type RegisterAuthPasswordSetupPayload = {
  [RegisterAuthActionEnum.SetPasswordSetupData]: RegisterAuthPasswordSetup;
};

export type RegisterAuthPasswordSetupActions =
  ActionMap<RegisterAuthPasswordSetupPayload>[keyof ActionMap<RegisterAuthPasswordSetupPayload>];
