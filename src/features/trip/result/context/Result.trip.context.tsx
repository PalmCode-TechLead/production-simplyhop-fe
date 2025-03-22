"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ResultTripActions,
  ResultTripInitialStateType,
} from "./Result.trip.types";
import {
  ResultTripAdvancedFilterReducers,
  ResultTripFiltersReducers,
} from "./Result.trip.reducers";

const initialState: ResultTripInitialStateType = {
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
    date: {
      selected: new Date(),
    },
    passenger: {
      value: [],
    },
  },
  advanced_filter: {
    seat: {
      selected: null,
    },
    luggage: {
      selected: null,
    },
    smoker: {
      selected: null,
    },
    music: {
      selected: null,
    },
    pets: {
      selected: null,
    },
  },
};

const ResultTripContext = createContext<{
  state: ResultTripInitialStateType;
  dispatch: Dispatch<ResultTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, advanced_filter }: ResultTripInitialStateType,
  action: ResultTripActions
) => ({
  filters: ResultTripFiltersReducers(filters, action),
  advanced_filter: ResultTripAdvancedFilterReducers(advanced_filter, action),
});

const ResultTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResultTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResultTripContext.Provider>
  );
};

export { ResultTripProvider, ResultTripContext };
