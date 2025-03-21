"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  SettingsSupportActions,
  SettingsSupportInitialStateType,
} from "./Settings.support.types";
import { SettingsSupportFiltersReducers } from "./Settings.support.reducers";

const initialState: SettingsSupportInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const SettingsSupportContext = createContext<{
  state: SettingsSupportInitialStateType;
  dispatch: Dispatch<SettingsSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: SettingsSupportInitialStateType,
  action: SettingsSupportActions
) => ({
  filters: SettingsSupportFiltersReducers(filters, action),
});

const SettingsSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SettingsSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SettingsSupportContext.Provider>
  );
};

export { SettingsSupportProvider, SettingsSupportContext };
