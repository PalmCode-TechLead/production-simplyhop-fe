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
export interface AccountSupportInitialStateType {
  deactivate: AccountSupportDeactivate;
}

// State Collection Types consist of:
export interface AccountSupportDeactivate {
  is_open: boolean;
}

export enum AccountSupportActionEnum {
  // Deactivate
  SetDeactivateData = "SetDeactivateData",
}

// Action Collection Types
export type AccountSupportActions = AccountSupportDeactivateActions;

// Action Collection Types consist of:
// Deactivate
type AccountSupportDeactivatePayload = {
  [AccountSupportActionEnum.SetDeactivateData]: AccountSupportDeactivate;
};

export type AccountSupportDeactivateActions =
  ActionMap<AccountSupportDeactivatePayload>[keyof ActionMap<AccountSupportDeactivatePayload>];
