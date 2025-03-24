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
export interface PlanRideTripInitialStateType {
  filters: PlanRideTripFilters;
  map: PlanRideTripMap;
}

// State Collection Types consist of:
export interface PlanRideTripFilters {
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

export interface PlanRideTripMap {
  polyline_path: { lat: number; lng: number }[];
}

export enum PlanRideTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
}

// Action Collection Types
export type PlanRideTripActions = PlanRideTripFiltersActions | PlanRideTripMapActions;

// Action Collection Types consist of:
// Filters
type PlanRideTripFiltersPayload = {
  [PlanRideTripActionEnum.SetFiltersData]: PlanRideTripFilters;
};

export type PlanRideTripFiltersActions =
  ActionMap<PlanRideTripFiltersPayload>[keyof ActionMap<PlanRideTripFiltersPayload>];

// Map
type PlanRideTripMapPayload = {
  [PlanRideTripActionEnum.SetMapData]: PlanRideTripMap;
};

export type PlanRideTripMapActions =
  ActionMap<PlanRideTripMapPayload>[keyof ActionMap<PlanRideTripMapPayload>];
