"use client";
import React from "react";
import { COORDINATE } from "@/core/utils/map/constants";
import { PlanRideTripContext } from "./PlanRide.trip.context";
import { PlanRideTripActionEnum } from "./PlanRide.trip.types";

export const useSetInitialContextValue = () => {
  const { state, dispatch } = React.useContext(PlanRideTripContext);

  React.useEffect(() => {
    dispatch({
      type: PlanRideTripActionEnum.SetMapData,
      payload: {
        ...state.map,
        initial_coordinate: COORDINATE.germany,
      },
    });
  }, []);
};
