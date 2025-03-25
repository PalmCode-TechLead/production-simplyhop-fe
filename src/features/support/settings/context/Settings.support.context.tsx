"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  SettingsSupportActions,
  SettingsSupportInitialStateType,
} from "./Settings.support.types";
import { SettingsSupportDeactivateReducers } from "./Settings.support.reducers";

const initialState: SettingsSupportInitialStateType = {
  deactivate: {
    is_open: false,
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
  { deactivate }: SettingsSupportInitialStateType,
  action: SettingsSupportActions
) => ({
  deactivate: SettingsSupportDeactivateReducers(deactivate, action),
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
