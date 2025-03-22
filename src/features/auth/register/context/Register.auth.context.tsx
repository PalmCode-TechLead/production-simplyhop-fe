"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  RegisterAuthActions,
  RegisterAuthInitialStateType,
} from "./Register.auth.types";
import { RegisterAuthFormReducers } from "./Register.auth.reducers";

const initialState: RegisterAuthInitialStateType = {
  form: {
    email: {
      value: "",
    },
    password: {
      value: "",
    },
  },
};

const RegisterAuthContext = createContext<{
  state: RegisterAuthInitialStateType;
  dispatch: Dispatch<RegisterAuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { form }: RegisterAuthInitialStateType,
  action: RegisterAuthActions
) => ({
  form: RegisterAuthFormReducers(form, action),
});

const RegisterAuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <RegisterAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RegisterAuthContext.Provider>
  );
};

export { RegisterAuthProvider, RegisterAuthContext };
