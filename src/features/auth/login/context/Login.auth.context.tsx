"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  LoginAuthActions,
  LoginAuthInitialStateType,
} from "./Login.auth.types";
import { LoginAuthFormReducers } from "./Login.auth.reducers";

const initialState: LoginAuthInitialStateType = {
  form: {
    email: {
      value: "",
    },
    password: {
      value: "",
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
  { form }: LoginAuthInitialStateType,
  action: LoginAuthActions
) => ({
  form: LoginAuthFormReducers(form, action),
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
