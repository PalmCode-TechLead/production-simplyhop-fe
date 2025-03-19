"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { FindRideActions, FindRideInitialStateType } from "./Find.ride.types";
import { FindRideFiltersReducers } from "./Find.ride.reducers";

const initialState: FindRideInitialStateType = {
  filters: {
    city: {
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
    },
    origin: {
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
    },
    destination: {
      selected: {
        item: null,
        lat_lng: null,
      },
      items: [],
    },
  },
};

const FindRideContext = createContext<{
  state: FindRideInitialStateType;
  dispatch: Dispatch<FindRideActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters }: FindRideInitialStateType,
  action: FindRideActions
) => ({
  filters: FindRideFiltersReducers(filters, action),
});

const FindRideProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <FindRideContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FindRideContext.Provider>
  );
};

export { FindRideProvider, FindRideContext };
