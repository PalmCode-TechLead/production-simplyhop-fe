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
  detail: PlanRideTripDetail;
  notification: PlanRideTripNotification;
}

// State Collection Types consist of:
export interface PlanRideTripFilters {
  auto: {
    query: string;
    items: { id: string; name: string }[];
    selected: null | { id: string; name: string };
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

export interface PlanRideTripDetail {
  is_open: boolean;
  form: {
    plan: {
      date: {
        selected: Date;
      };
      time: {
        value: string;
      };
      recurring: {
        selected: null | { id: string; name: string };
      };
      umweg: {
        value: string;
      };
      seat: {
        value: string;
      };
      back_seat: {
        checked: boolean;
      };
    };
    tnc: {
      checked: boolean;
    };
  };
}

export interface PlanRideTripNotification {
  is_open: boolean;
}

export enum PlanRideTripActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
  // Map
  SetMapData = "SetMapData",
  // Detail
  SetDetailData = "SetDetailData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type PlanRideTripActions =
  | PlanRideTripFiltersActions
  | PlanRideTripMapActions
  | PlanRideTripDetailActions
  | PlanRideTripNotificationActions;

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

// Detail
type PlanRideTripDetailPayload = {
  [PlanRideTripActionEnum.SetDetailData]: PlanRideTripDetail;
};

export type PlanRideTripDetailActions =
  ActionMap<PlanRideTripDetailPayload>[keyof ActionMap<PlanRideTripDetailPayload>];

// Notification
type PlanRideTripNotificationPayload = {
  [PlanRideTripActionEnum.SetNotificationData]: PlanRideTripNotification;
};

export type PlanRideTripNotificationActions =
  ActionMap<PlanRideTripNotificationPayload>[keyof ActionMap<PlanRideTripNotificationPayload>];
