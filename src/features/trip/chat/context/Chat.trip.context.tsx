"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ChatTripActions, ChatTripInitialStateType } from "./Chat.trip.types";
import {
  ChatTripFiltersReducers,
  ChatTripMapReducers,
} from "./Chat.trip.reducers";

const initialState: ChatTripInitialStateType = {
  filters: {
    city: {
      items: [],
    },
  },
  map: {
    polyline_path: [],
  },
};

const ChatTripContext = createContext<{
  state: ChatTripInitialStateType;
  dispatch: Dispatch<ChatTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, map }: ChatTripInitialStateType,
  action: ChatTripActions
) => ({
  filters: ChatTripFiltersReducers(filters, action),
  map: ChatTripMapReducers(map, action),
});

const ChatTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ChatTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ChatTripContext.Provider>
  );
};

export { ChatTripProvider, ChatTripContext };
