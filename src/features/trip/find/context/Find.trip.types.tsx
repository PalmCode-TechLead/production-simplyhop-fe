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
export interface FindTripInitialStateType {
  filters: FindTripFilters;
  map: FindTripMap;
}

// State Collection Types consist of:
export interface FindTripFilters {
  origin: {
    bottom_sheet: {
      is_open: boolean;
    };
    items: { id: string; name: string }[];
    selected: {
      item: null | { id: string; name: string };
      lat_lng: null | { lat: number; lng: number };
    };
  };
  destination: {
    bottom_sheet: {
      is_open: boolean;
    };
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

export interface FindTripMap {
  polyline_path: { lat: number; lng: number }[];
}

export enum FindTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
}

// Action Collection Types
export type FindTripActions = FindTripFiltersActions | FindTripMapActions;

// Action Collection Types consist of:
// Filters
type FindTripFiltersPayload = {
  [FindTripActionEnum.SetFiltersData]: FindTripFilters;
};

export type FindTripFiltersActions =
  ActionMap<FindTripFiltersPayload>[keyof ActionMap<FindTripFiltersPayload>];

// Map
type FindTripMapPayload = {
  [FindTripActionEnum.SetMapData]: FindTripMap;
};

export type FindTripMapActions =
  ActionMap<FindTripMapPayload>[keyof ActionMap<FindTripMapPayload>];
