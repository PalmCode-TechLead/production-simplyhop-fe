"use client";
import * as React from "react";
import clsx from "clsx";
import { CarFacilityFilterCounterBadge } from "@/core/components/car_facility_filter_counter_badge";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { CarFacilityFilterDropdown } from "@/core/components/car_facility_filter_dropdown";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { CarSortDropdown } from "@/core/components/car_sort_dropdown";

export const VehicleFilterResulTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const globalDictionaries = getGlobalDictionaries();

  const setMultipleCheckboxPayload = (
    data: { id: string; name: string }[],
    value: { id: string; name: string }
  ) => {
    const dataIds = data.map((item) => item.id);
    const result = dataIds.includes(value.id)
      ? data.filter((item) => item.id !== value.id)
      : [...data, value];
    return result;
  };

  const handleSelectLuggage = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.luggage.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        luggage: {
          ...state.advanced_filter.luggage,
          selected: selected,
        },
      },
    });
  };

  const handleSelectSmoker = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.smoker.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        smoker: {
          ...state.advanced_filter.smoker,
          selected: selected,
        },
      },
    });
  };

  const handleSelectMusic = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.music.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        music: {
          ...state.advanced_filter.music,
          selected: selected,
        },
      },
    });
  };

  const handleSelectPets = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.advanced_filter.pets.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        pets: {
          ...state.advanced_filter.pets,
          selected: selected,
        },
      },
    });
  };

  const handleSelectSort = (data: { id: string; name: string }) => {
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        sort: {
          ...state.advanced_filter.sort,
          selected: data,
        },
      },
    });
  };

  const handleClickVehicleFilters = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1.5rem]",
        "w-full",
        "bg-[white]"
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
          onClick={handleClickVehicleFilters}
        />

        <div
          className={clsx(
            "hidden lg:grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <CarFacilityFilterDropdown
            {...dictionaries.advanced_filter.luggage}
            items={Array.from({ length: 4 }, (_, i) => String(i + 1)).map(
              (item) => {
                return { id: item, name: item };
              }
            )}
            selected={state.advanced_filter.luggage.selected}
            onSelect={handleSelectLuggage}
          />
          <CarFacilityFilterDropdown
            {...dictionaries.advanced_filter.smoker}
            items={
              globalDictionaries.car.facility.seat.smoking.type.options.items
            }
            selected={state.advanced_filter.smoker.selected}
            onSelect={handleSelectSmoker}
          />
          <CarFacilityFilterDropdown
            {...dictionaries.advanced_filter.music}
            items={
              globalDictionaries.car.facility.seat.music.type.options.items
            }
            selected={state.advanced_filter.music.selected}
            onSelect={handleSelectMusic}
          />
          <CarFacilityFilterDropdown
            {...dictionaries.advanced_filter.pets}
            items={globalDictionaries.car.facility.seat.pets.type.options.items}
            selected={state.advanced_filter.pets.selected}
            onSelect={handleSelectPets}
          />
        </div>
      </div>

      {/* sort */}
      <CarSortDropdown
        {...dictionaries.advanced_filter.sort}
        selected={state.advanced_filter.sort.selected}
        onSelect={handleSelectSort}
      />
    </div>
  );
};
