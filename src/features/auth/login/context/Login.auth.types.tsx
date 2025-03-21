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
export interface LoginAuthInitialStateType {
  filters: LoginAuthFilters;
}

// State Collection Types consist of:
export interface LoginAuthFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum LoginAuthActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type LoginAuthActions = LoginAuthFiltersActions;

// Action Collection Types consist of:
// Filters
type LoginAuthFiltersPayload = {
  [LoginAuthActionEnum.SetFiltersData]: LoginAuthFilters;
};

export type LoginAuthFiltersActions =
  ActionMap<LoginAuthFiltersPayload>[keyof ActionMap<LoginAuthFiltersPayload>];
