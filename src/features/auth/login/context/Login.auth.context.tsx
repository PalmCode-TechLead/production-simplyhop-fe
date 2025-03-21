"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  LoginAuthActions,
  LoginAuthInitialStateType,
} from "./Login.auth.types";
import { LoginAuthFiltersReducers } from "./Login.auth.reducers";

const initialState: LoginAuthInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
};

const LoginAuthContext = createContext<{
  state: LoginAuthInitialStateType;
  dispatch: Dispatch<LoginAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: LoginAuthInitialStateType,
  action: LoginAuthActions
) => ({
  filters: LoginAuthFiltersReducers(filters, action),
});

const LoginAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <LoginAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LoginAuthContext.Provider>
  );
};

export { LoginAuthProvider, LoginAuthContext };
