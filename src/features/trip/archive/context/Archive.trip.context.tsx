"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  ArchiveTripActions,
  ArchiveTripInitialStateType,
} from "./Archive.trip.types";
import {
  ArchiveTripBookReducers,
  ArchiveTripFiltersReducers,
  ArchiveTripRideDetailReducers,
  ArchiveTripRideReducers,
} from "./Archive.trip.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: ArchiveTripInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
  ride: {
    data: [],
    pagination: {
      current: PAGINATION.NUMBER,
      last: 3,
    },
  },
  ride_detail: {
    data: null,
  },
  book: {
    data: [],
    pagination: {
      current: PAGINATION.NUMBER,
      last: null,
    },
    detail: null,
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
  { filters, ride, ride_detail, book }: ArchiveTripInitialStateType,
  action: ArchiveTripActions
) => ({
  filters: ArchiveTripFiltersReducers(filters, action),
  ride: ArchiveTripRideReducers(ride, action),
  ride_detail: ArchiveTripRideDetailReducers(ride_detail, action),
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
