"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { GlobalActions, GlobalInitialStateType } from "./Global.types";
import { GlobalAlertReducers, GlobalChatReducers } from "./Global.reducers";
import { useGetMessageRoomsUnreadList } from "@/core/utils/react_query/hooks";

const initialState: GlobalInitialStateType = {
  alert: {
    items: [],
  },
  chat: {
    count: 0,
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
  { alert, chat }: GlobalInitialStateType,
  action: GlobalActions
) => ({
  alert: GlobalAlertReducers(alert, action),
  chat: GlobalChatReducers(chat, action),
});

const GlobalProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  useGetMessageRoomsUnreadList();
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
