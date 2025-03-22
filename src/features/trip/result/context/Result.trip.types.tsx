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
export interface ResultTripInitialStateType {
  filters: ResultTripFilters;
}

// State Collection Types consist of:
export interface ResultTripFilters {
  city: {
    items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  origin: {
    items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  destination: {
    items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  date: {
    selected: Date;
  };

  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum ResultTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type ResultTripActions = ResultTripFiltersActions;

// Action Collection Types consist of:
// Filters
type ResultTripFiltersPayload = {
  [ResultTripActionEnum.SetFiltersData]: ResultTripFilters;
};

export type ResultTripFiltersActions =
  ActionMap<ResultTripFiltersPayload>[keyof ActionMap<ResultTripFiltersPayload>];
