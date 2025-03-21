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
export interface MyListTripInitialStateType {
  filters: MyListTripFilters;
}

// State Collection Types consist of:
export interface MyListTripFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum MyListTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type MyListTripActions = MyListTripFiltersActions;

// Action Collection Types consist of:
// Filters
type MyListTripFiltersPayload = {
  [MyListTripActionEnum.SetFiltersData]: MyListTripFilters;
};

export type MyListTripFiltersActions =
  ActionMap<MyListTripFiltersPayload>[keyof ActionMap<MyListTripFiltersPayload>];
