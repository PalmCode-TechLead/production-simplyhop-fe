"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountSupportActions,
  AccountSupportInitialStateType,
} from "./Account.support.types";
import { AccountSupportFiltersReducers } from "./Account.support.reducers";

const initialState: AccountSupportInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const AccountSupportContext = createContext<{
  state: AccountSupportInitialStateType;
  dispatch: Dispatch<AccountSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: AccountSupportInitialStateType,
  action: AccountSupportActions
) => ({
  filters: AccountSupportFiltersReducers(filters, action),
});

const AccountSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AccountSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AccountSupportContext.Provider>
  );
};

export { AccountSupportProvider, AccountSupportContext };
