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
export interface FindRideInitialStateType {
  filters: FindRideFilters;
}

// State Collection Types consist of:
export interface FindRideFilters {
  city: {
    items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  start: {
    items: { id: string; name: string }[];
    selected: null | { id: string; name: string };
  };
  end: {
    items: { id: string; name: string }[];
    selected: null | { id: string; name: string };
  };
}

export enum FindRideActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type FindRideActions = FindRideFiltersActions;

// Action Collection Types consist of:
// Filters
type FindRideFiltersPayload = {
  [FindRideActionEnum.SetFiltersData]: FindRideFilters;
};

export type FindRideFiltersActions =
  ActionMap<FindRideFiltersPayload>[keyof ActionMap<FindRideFiltersPayload>];
