"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  AccountSupportActions,
  AccountSupportInitialStateType,
} from "./Account.support.types";
import { AccountSupportDeactivateConfirmationReducers, AccountSupportDeactivateNotificationReducers, AccountSupportDeactivateReducers } from "./Account.support.reducers";

const initialState: AccountSupportInitialStateType = {
  deactivate: {
    is_open: false,
  },
  deactivate_confirmation: {
    is_open: false,
    form: {
      password: {
        value: "",
      },
    },
  },
  deactivate_notification: {
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
  {
    deactivate,
    deactivate_confirmation,
    deactivate_notification,
  }: AccountSupportInitialStateType,
  action: AccountSupportActions
) => ({
  deactivate: AccountSupportDeactivateReducers(deactivate, action),
  deactivate_confirmation: AccountSupportDeactivateConfirmationReducers(deactivate_confirmation, action),
  deactivate_notification: AccountSupportDeactivateNotificationReducers(deactivate_notification, action),
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
