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
export interface AccountSettingsInitialStateType {
  filters: AccountSettingsFilters;
}

// State Collection Types consist of:
export interface AccountSettingsFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum AccountSettingsActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type AccountSettingsActions = AccountSettingsFiltersActions;

// Action Collection Types consist of:
// Filters
type AccountSettingsFiltersPayload = {
  [AccountSettingsActionEnum.SetFiltersData]: AccountSettingsFilters;
};

export type AccountSettingsFiltersActions =
  ActionMap<AccountSettingsFiltersPayload>[keyof ActionMap<AccountSettingsFiltersPayload>];
