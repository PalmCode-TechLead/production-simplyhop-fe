"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  VehiclesSupportActions,
  VehiclesSupportInitialStateType,
} from "./Vehicles.support.types";
import { VehiclesSupportListReducers } from "./Vehicles.support.reducers";

const initialState: VehiclesSupportInitialStateType = {
  list: {
    data: [],
  },
};

const VehiclesSupportContext = createContext<{
  state: VehiclesSupportInitialStateType;
  dispatch: Dispatch<VehiclesSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { list }: VehiclesSupportInitialStateType,
  action: VehiclesSupportActions
) => ({
  list: VehiclesSupportListReducers(list, action),
});

const VehiclesSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <VehiclesSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VehiclesSupportContext.Provider>
  );
};

export { VehiclesSupportProvider, VehiclesSupportContext };
