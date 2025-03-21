"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ChatTripActions, ChatTripInitialStateType } from "./Chat.trip.types";
import {
  ChatTripListReducers,
  ChatTripConversationReducers,
} from "./Chat.trip.reducers";

const initialState: ChatTripInitialStateType = {
  list: {
    search: {
      value: "",
    },
    tab: {
      selected: null,
    },
    message: {
      items: [],
    },
  },
  conversation: {
    message: {
      items: [],
    },

    input: {
      value: "",
    },
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
  { list, conversation }: ChatTripInitialStateType,
  action: ChatTripActions
) => ({
  list: ChatTripListReducers(list, action),
  conversation: ChatTripConversationReducers(conversation, action),
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
