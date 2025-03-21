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
export interface SettingsSupportInitialStateType {
  filters: SettingsSupportFilters;
}

// State Collection Types consist of:
export interface SettingsSupportFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum SettingsSupportActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type SettingsSupportActions = SettingsSupportFiltersActions;

// Action Collection Types consist of:
// Filters
type SettingsSupportFiltersPayload = {
  [SettingsSupportActionEnum.SetFiltersData]: SettingsSupportFilters;
};

export type SettingsSupportFiltersActions =
  ActionMap<SettingsSupportFiltersPayload>[keyof ActionMap<SettingsSupportFiltersPayload>];
