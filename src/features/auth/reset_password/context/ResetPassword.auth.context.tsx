"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ResetPasswordAuthActions,
  ResetPasswordAuthInitialStateType,
} from "./ResetPassword.auth.types";
import {
  ResetPasswordAuthFormReducers,
  ResetPasswordAuthStateReducers,
} from "./ResetPassword.auth.reducers";

const initialState: ResetPasswordAuthInitialStateType = {
  state: {
    step: "form",
  },
  form: {
    password: {
      value: "",
      error: null,
    },
    password_confirmation: {
      value: "",
      error: null,
    },
  },
};

const ResetPasswordAuthContext = createContext<{
  state: ResetPasswordAuthInitialStateType;
  dispatch: Dispatch<ResetPasswordAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { state, form }: ResetPasswordAuthInitialStateType,
  action: ResetPasswordAuthActions
) => ({
  state: ResetPasswordAuthStateReducers(state, action),
  form: ResetPasswordAuthFormReducers(form, action),
});

const ResetPasswordAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResetPasswordAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResetPasswordAuthContext.Provider>
  );
};

export { ResetPasswordAuthProvider, ResetPasswordAuthContext };
