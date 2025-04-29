"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  MyListTripActions,
  MyListTripInitialStateType,
} from "./MyList.trip.types";
import {
  MyListTripBookReducers,
  MyListTripFiltersReducers,
  MyListTripRideReducers,
} from "./MyList.trip.reducers";
import { PAGINATION } from "@/core/utils/pagination/contants";

const initialState: MyListTripInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
  ride: {
    data: [],
    pagination: {
      number: PAGINATION.NUMBER,
      is_end_reached: false,
    },
    detail: null,
  },
  book: {
    data: [],
    pagination: {
      number: PAGINATION.NUMBER,
      is_end_reached: false,
    },
    detail: null,
  },
};

const MyListTripContext = createContext<{
  state: MyListTripInitialStateType;
  dispatch: Dispatch<MyListTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, ride, book }: MyListTripInitialStateType,
  action: MyListTripActions
) => ({
  filters: MyListTripFiltersReducers(filters, action),
  ride: MyListTripRideReducers(ride, action),
  book: MyListTripBookReducers(book, action),
});

const MyListTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MyListTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyListTripContext.Provider>
  );
};

export { MyListTripProvider, MyListTripContext };
