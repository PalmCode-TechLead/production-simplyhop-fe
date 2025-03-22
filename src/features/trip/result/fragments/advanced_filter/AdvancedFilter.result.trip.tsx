"use client";
import * as React from "react";
import clsx from "clsx";
import { CarFacilityFilterCounterBadge } from "@/core/components/car_facility_filter_counter_badge";
import { getDictionaries } from "../../i18n";
import { CarFacilityFilterDropdown } from "@/core/components/car_facility_filter_dropdown";
import { ResultTripActionEnum, ResultTripContext } from "../../context";

export const CarFacilityFilterResulTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);

  const handleSelectSeat = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        seat: {
          ...state.advanced_filter.seat,
          selected: data,
        },
      },
    });
  };

  const handleSelectLuggage = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        luggage: {
          ...state.advanced_filter.luggage,
          selected: data,
        },
      },
    });
  };

  const handleSelectSmoker = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        smoker: {
          ...state.advanced_filter.smoker,
          selected: data,
        },
      },
    });
  };

  const handleSelectMusic = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        music: {
          ...state.advanced_filter.music,
          selected: data,
        },
      },
    });
  };

  const handleSelectPets = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        pets: {
          ...state.advanced_filter.pets,
          selected: data,
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <CarFacilityFilterCounterBadge
          {...dictionaries.advanced_filter.counter}
        />
        <CarFacilityFilterDropdown
          {...dictionaries.advanced_filter.seat}
          selected={state.advanced_filter.seat.selected}
          onSelect={handleSelectSeat}
        />
        <CarFacilityFilterDropdown
          {...dictionaries.advanced_filter.luggage}
          selected={state.advanced_filter.luggage.selected}
          onSelect={handleSelectLuggage}
        />
        <CarFacilityFilterDropdown
          {...dictionaries.advanced_filter.smoker}
          selected={state.advanced_filter.smoker.selected}
          onSelect={handleSelectSmoker}
        />
        <CarFacilityFilterDropdown
          {...dictionaries.advanced_filter.music}
          selected={state.advanced_filter.music.selected}
          onSelect={handleSelectMusic}
        />
        <CarFacilityFilterDropdown
          {...dictionaries.advanced_filter.pets}
          selected={state.advanced_filter.pets.selected}
          onSelect={handleSelectPets}
        />
      </div>

      {/* sort */}
    </div>
  );
};
