import { CardVehiclesSupportProps } from "../components/card";

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
export interface VehiclesSupportInitialStateType {
  list: VehiclesSupportList;
}

// State Collection Types consist of:
export interface VehiclesSupportList {
  data: CardVehiclesSupportProps[];
}

export enum VehiclesSupportActionEnum {
  // List
  SetListData = "SetListData",
}

// Action Collection Types
export type VehiclesSupportActions = VehiclesSupportListActions;

// Action Collection Types consist of:
// List
type VehiclesSupportListPayload = {
  [VehiclesSupportActionEnum.SetListData]: VehiclesSupportList;
};

export type VehiclesSupportListActions =
  ActionMap<VehiclesSupportListPayload>[keyof ActionMap<VehiclesSupportListPayload>];
