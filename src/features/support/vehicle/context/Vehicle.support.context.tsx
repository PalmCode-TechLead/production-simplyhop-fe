"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  VehicleSupportActions,
  VehicleSupportInitialStateType,
} from "./Vehicle.support.types";
import { VehicleSupportFiltersReducers } from "./Vehicle.support.reducers";

const initialState: VehicleSupportInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const VehicleSupportContext = createContext<{
  state: VehicleSupportInitialStateType;
  dispatch: Dispatch<VehicleSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: VehicleSupportInitialStateType,
  action: VehicleSupportActions
) => ({
  filters: VehicleSupportFiltersReducers(filters, action),
});

const VehicleSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <VehicleSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VehicleSupportContext.Provider>
  );
};

export { VehicleSupportProvider, VehicleSupportContext };
