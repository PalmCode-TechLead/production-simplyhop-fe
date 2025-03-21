"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountSettingsActions,
  AccountSettingsInitialStateType,
} from "./Account.settings.types";
import { AccountSettingsFiltersReducers } from "./Account.settings.reducers";

const initialState: AccountSettingsInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const AccountSettingsContext = createContext<{
  state: AccountSettingsInitialStateType;
  dispatch: Dispatch<AccountSettingsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: AccountSettingsInitialStateType,
  action: AccountSettingsActions
) => ({
  filters: AccountSettingsFiltersReducers(filters, action),
});

const AccountSettingsProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AccountSettingsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AccountSettingsContext.Provider>
  );
};

export { AccountSettingsProvider, AccountSettingsContext };
