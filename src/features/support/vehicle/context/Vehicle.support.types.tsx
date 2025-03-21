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
export interface VehicleSupportInitialStateType {
  filters: VehicleSupportFilters;
}

// State Collection Types consist of:
export interface VehicleSupportFilters {
  passenger: {
    value: { id: string; value: number }[];
  };
}

export enum VehicleSupportActionEnum {
  // Filters
  SetFiltersData = "SetFiltersData",
}

// Action Collection Types
export type VehicleSupportActions = VehicleSupportFiltersActions;

// Action Collection Types consist of:
// Filters
type VehicleSupportFiltersPayload = {
  [VehicleSupportActionEnum.SetFiltersData]: VehicleSupportFilters;
};

export type VehicleSupportFiltersActions =
  ActionMap<VehicleSupportFiltersPayload>[keyof ActionMap<VehicleSupportFiltersPayload>];
