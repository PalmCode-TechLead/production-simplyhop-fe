"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ArchiveTripActions,
  ArchiveTripInitialStateType,
} from "./Archive.trip.types";
import {
  ArchiveTripBookReducers,
  ArchiveTripFiltersReducers,
  ArchiveTripRideReducers,
} from "./Archive.trip.reducers";

const initialState: ArchiveTripInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
  ride: {
    data: [],
  },
  book: {
    data: [],
  },
};

const ArchiveTripContext = createContext<{
  state: ArchiveTripInitialStateType;
  dispatch: Dispatch<ArchiveTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, ride, book }: ArchiveTripInitialStateType,
  action: ArchiveTripActions
) => ({
  filters: ArchiveTripFiltersReducers(filters, action),
  ride: ArchiveTripRideReducers(ride, action),
  book: ArchiveTripBookReducers(book, action),
});

const ArchiveTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ArchiveTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ArchiveTripContext.Provider>
  );
};

export { ArchiveTripProvider, ArchiveTripContext };
