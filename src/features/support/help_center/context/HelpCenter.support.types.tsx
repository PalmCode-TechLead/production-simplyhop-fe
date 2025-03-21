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
export interface HelpCenterSupportInitialStateType {
  filters: HelpCenterSupportFilters;
}

// State Collection Types consist of:
export interface HelpCenterSupportFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum HelpCenterSupportActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type HelpCenterSupportActions = HelpCenterSupportFiltersActions;

// Action Collection Types consist of:
// Filters
type HelpCenterSupportFiltersPayload = {
  [HelpCenterSupportActionEnum.SetFiltersData]: HelpCenterSupportFilters;
};

export type HelpCenterSupportFiltersActions =
  ActionMap<HelpCenterSupportFiltersPayload>[keyof ActionMap<HelpCenterSupportFiltersPayload>];
