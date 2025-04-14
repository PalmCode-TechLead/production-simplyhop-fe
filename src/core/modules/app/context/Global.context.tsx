"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { GlobalActions, GlobalInitialStateType } from "./Global.types";
import { GlobalAlertReducers } from "./Global.reducers";

const initialState: GlobalInitialStateType = {
  alert: {
    items: [],
  },
};

const GlobalContext = createContext<{
  state: GlobalInitialStateType;
  dispatch: Dispatch<GlobalActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { alert }: GlobalInitialStateType,
  action: GlobalActions
) => ({
  alert: GlobalAlertReducers(alert, action),
});

const GlobalProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
