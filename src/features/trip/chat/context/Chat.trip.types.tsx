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
export interface ChatTripInitialStateType {
  filters: ChatTripFilters;
  map: ChatTripMap;
}

// State Collection Types consist of:
export interface ChatTripFilters {
  city: {
    items: { id: string; name: string }[];
  };
}

export interface ChatTripMap {
  polyline_path: { lat: number; lng: number }[];
}

export enum ChatTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
}

// Action Collection Types
export type ChatTripActions = ChatTripFiltersActions | ChatTripMapActions;

// Action Collection Types consist of:
// Filters
type ChatTripFiltersPayload = {
  [ChatTripActionEnum.SetFiltersData]: ChatTripFilters;
};

export type ChatTripFiltersActions =
  ActionMap<ChatTripFiltersPayload>[keyof ActionMap<ChatTripFiltersPayload>];

// Map
type ChatTripMapPayload = {
  [ChatTripActionEnum.SetMapData]: ChatTripMap;
};

export type ChatTripMapActions =
  ActionMap<ChatTripMapPayload>[keyof ActionMap<ChatTripMapPayload>];
