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

const initialState: MyListTripInitialStateType = {
  filters: {
    passenger: {
      value: [],
    },
  },
  ride: {
    data: [],
    detail: null,
  },
  book: {
    data: [],
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
