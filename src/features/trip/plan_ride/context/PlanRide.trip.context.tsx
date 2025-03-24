"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { PlanRideTripActions, PlanRideTripInitialStateType } from "./PlanRide.trip.types";
import {
  PlanRideTripFiltersReducers,
  PlanRideTripMapReducers,
} from './PlanRide.trip.reducers'

const initialState: PlanRideTripInitialStateType = {
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
  map: {
    polyline_path: [],
  },
};

const PlanRideTripContext = createContext<{
  state: PlanRideTripInitialStateType;
  dispatch: Dispatch<PlanRideTripActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { filters, map }: PlanRideTripInitialStateType,
  action: PlanRideTripActions
) => ({
  filters: PlanRideTripFiltersReducers(filters, action),
  map: PlanRideTripMapReducers(map, action),
});

const PlanRideTripProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PlanRideTripContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlanRideTripContext.Provider>
  );
};

export { PlanRideTripProvider, PlanRideTripContext };
