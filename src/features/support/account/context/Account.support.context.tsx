"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountSupportActions,
  AccountSupportInitialStateType,
} from "./Account.support.types";
import { AccountSupportDeactivateReducers } from "./Account.support.reducers";

const initialState: AccountSupportInitialStateType = {
  deactivate: {
    is_open: false,
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
  { deactivate }: AccountSupportInitialStateType,
  action: AccountSupportActions
) => ({
  deactivate: AccountSupportDeactivateReducers(deactivate, action),
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
