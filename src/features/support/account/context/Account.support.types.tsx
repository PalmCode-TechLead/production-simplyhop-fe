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
  filters: AccountSupportFilters;
}

// State Collection Types consist of:
export interface AccountSupportFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum AccountSupportActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type AccountSupportActions = AccountSupportFiltersActions;

// Action Collection Types consist of:
// Filters
type AccountSupportFiltersPayload = {
  [AccountSupportActionEnum.SetFiltersData]: AccountSupportFilters;
};

export type AccountSupportFiltersActions =
  ActionMap<AccountSupportFiltersPayload>[keyof ActionMap<AccountSupportFiltersPayload>];
