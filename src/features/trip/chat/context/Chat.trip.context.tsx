"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ChatTripActions, ChatTripInitialStateType } from "./Chat.trip.types";
import {
  ChatTripListReducers,
  ChatTripRoomReducers,
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
  room: {
    id: null,
    booking: {
      status: null,
    },
    header: {
      avatar: {
        src: undefined,
        alt: "",
      },
      name: "",
    },
    message: {
      items: [],
    },

    chat: {
      input: {
        value: "",
      },
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
  { list, room }: ChatTripInitialStateType,
  action: ChatTripActions
) => ({
  list: ChatTripListReducers(list, action),
  room: ChatTripRoomReducers(room, action),
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
