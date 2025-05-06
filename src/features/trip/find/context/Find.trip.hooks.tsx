"use client";
import React from "react";
import { FindTripContext } from "./Find.trip.context";
import { FindTripActionEnum } from "./Find.trip.types";
import { getDictionaries } from "../i18n";
import { coordinate } from "@/core/utils/map/constants";

export const useSetInitialContextValue = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(FindTripContext);

  React.useEffect(() => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          value: dictionaries.filter.form.passenger.detail.items.map((item) => {
            return {
              id: item.id,
              value: item.value,
            };
          }),
        },
      },
    });
    dispatch({
      type: FindTripActionEnum.SetMapData,
      payload: {
        ...state.map,
        initial_coordinate: coordinate.germany,
      },
    });
  }, []);
};
