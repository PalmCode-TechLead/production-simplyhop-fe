"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ForgotPasswordAuthActions,
  ForgotPasswordAuthInitialStateType,
} from "./ForgotPassword.auth.types";
import {
  ForgotPasswordAuthFormReducers,
  ForgotPasswordAuthStateReducers,
} from "./ForgotPassword.auth.reducers";

const initialState: ForgotPasswordAuthInitialStateType = {
  state: {
    step: "form",
  },
  form: {
    email: {
      value: "",
      error: null,
    },
  },
};

const ForgotPasswordAuthContext = createContext<{
  state: ForgotPasswordAuthInitialStateType;
  dispatch: Dispatch<ForgotPasswordAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { state, form }: ForgotPasswordAuthInitialStateType,
  action: ForgotPasswordAuthActions
) => ({
  state: ForgotPasswordAuthStateReducers(state, action),
  form: ForgotPasswordAuthFormReducers(form, action),
});

const ForgotPasswordAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ForgotPasswordAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ForgotPasswordAuthContext.Provider>
  );
};

export { ForgotPasswordAuthProvider, ForgotPasswordAuthContext };
