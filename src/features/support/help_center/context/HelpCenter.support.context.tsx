"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  HelpCenterSupportActions,
  HelpCenterSupportInitialStateType,
} from "./HelpCenter.support.types";
import { HelpCenterSupportFiltersReducers } from "./HelpCenter.support.reducers";

const initialState: HelpCenterSupportInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const HelpCenterSupportContext = createContext<{
  state: HelpCenterSupportInitialStateType;
  dispatch: Dispatch<HelpCenterSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: HelpCenterSupportInitialStateType,
  action: HelpCenterSupportActions
) => ({
  filters: HelpCenterSupportFiltersReducers(filters, action),
});

const HelpCenterSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <HelpCenterSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HelpCenterSupportContext.Provider>
  );
};

export { HelpCenterSupportProvider, HelpCenterSupportContext };
