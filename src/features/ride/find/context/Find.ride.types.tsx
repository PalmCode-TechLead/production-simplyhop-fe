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
  map: FindRideMap;
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

export interface FindRideMap {
  polyline_path: { lat: number; lng: number }[];
}

export enum FindRideActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
}

// Action Collection Types
export type FindRideActions = FindRideFiltersActions | FindRideMapActions;

// Action Collection Types consist of:
// Filters
type FindRideFiltersPayload = {
  [FindRideActionEnum.SetFiltersData]: FindRideFilters;
};

export type FindRideFiltersActions =
  ActionMap<FindRideFiltersPayload>[keyof ActionMap<FindRideFiltersPayload>];

// Map
type FindRideMapPayload = {
  [FindRideActionEnum.SetMapData]: FindRideMap;
};

export type FindRideMapActions =
  ActionMap<FindRideMapPayload>[keyof ActionMap<FindRideMapPayload>];
