import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { VehicleFilterList } from "@/core/components/vehicle_filter_list";
import { Divider } from "@/core/components/divider";
import { Button } from "@/core/components/button";

export const VehicleFilters = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);

  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: false,
      },
    });
  };

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

  const handleSelectSeat = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.seat.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        seat: {
          ...state.vehicle_filters.seat,
          selected: selected,
        },
      },
    });
  };

  const handleSelectLuggage = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.luggage.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        luggage: {
          ...state.vehicle_filters.luggage,
          selected: selected,
        },
      },
    });
  };

  const handleSelectSmoker = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.smoker.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        smoker: {
          ...state.vehicle_filters.smoker,
          selected: selected,
        },
      },
    });
  };

  const handleSelectMusic = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.music.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        music: {
          ...state.vehicle_filters.music,
          selected: selected,
        },
      },
    });
  };

  const handleSelectPets = (data: { id: string; name: string }) => {
    const selected = setMultipleCheckboxPayload(
      state.vehicle_filters.pets.selected,
      data
    );
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        pets: {
          ...state.vehicle_filters.pets,
          selected: selected,
        },
      },
    });
  };

  const handleClickReset = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        seat: {
          ...state.vehicle_filters.seat,
          selected: [],
        },
        luggage: {
          ...state.vehicle_filters.luggage,
          selected: [],
        },
        smoker: {
          ...state.vehicle_filters.smoker,
          selected: [],
        },
        music: {
          ...state.vehicle_filters.music,
          selected: [],
        },
        pets: {
          ...state.vehicle_filters.pets,
          selected: [],
        },
      },
    });
  };

  const handleClickApply = () => {
    dispatch({
      type: ResultTripActionEnum.SetVehicleFiltersData,
      payload: {
        ...state.vehicle_filters,
        is_open: false,
      },
    });
    dispatch({
      type: ResultTripActionEnum.SetAdvancedFilterData,
      payload: {
        ...state.advanced_filter,
        seat: {
          ...state.advanced_filter.seat,
          selected: state.vehicle_filters.seat.selected,
        },
        luggage: {
          ...state.advanced_filter.luggage,
          selected: state.vehicle_filters.luggage.selected,
        },
        smoker: {
          ...state.advanced_filter.smoker,
          selected: state.vehicle_filters.smoker.selected,
        },
        music: {
          ...state.advanced_filter.music,
          selected: state.vehicle_filters.music.selected,
        },
        pets: {
          ...state.advanced_filter.pets,
          selected: state.vehicle_filters.pets.selected,
        },
      },
    });
  };
  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw-3rem)] sm:!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[2rem] !py-[2rem]"
      )}
      open={state.vehicle_filters.is_open}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button className={clsx("cursor-pointer")} onClick={handleClose}>
              <SVGIcon
                name="X"
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
              />
            </button>
            <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
              {dictionaries.vehicle_filters.title}
            </h2>
          </div>

          <button
            className={clsx(
              "cursor-pointer",
              "px-[1rem] py-[1rem]",
              "text-[#5AC53D] text-[1rem] font-medium"
            )}
            onClick={handleClickReset}
          >
            {dictionaries.vehicle_filters.cta.reset.children}
          </button>
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1.5rem]",
            "w-full max-h-[300px]",
            "overflow-auto"
          )}
        >
          <VehicleFilterList
            {...dictionaries.vehicle_filters.seat}
            items={Array.from({ length: 6 }, (_, i) => String(i + 1)).map(
              (item) => {
                return { id: item, name: item };
              }
            )}
            selected={state.vehicle_filters.seat.selected}
            onSelect={handleSelectSeat}
          />
          <Divider />
          <VehicleFilterList
            {...dictionaries.vehicle_filters.luggage}
            items={Array.from({ length: 4 }, (_, i) => String(i + 1)).map(
              (item) => {
                return { id: item, name: item };
              }
            )}
            selected={state.vehicle_filters.luggage.selected}
            onSelect={handleSelectLuggage}
          />
          <Divider />
          <VehicleFilterList
            {...dictionaries.vehicle_filters.smoker}
            items={
              globalDictionaries.car.facility.seat.smoking.type.options.items
            }
            selected={state.vehicle_filters.smoker.selected}
            onSelect={handleSelectSmoker}
          />
          <Divider />
          <VehicleFilterList
            {...dictionaries.vehicle_filters.music}
            items={
              globalDictionaries.car.facility.seat.music.type.options.items
            }
            selected={state.vehicle_filters.music.selected}
            onSelect={handleSelectMusic}
          />
          <Divider />
          <VehicleFilterList
            {...dictionaries.vehicle_filters.pets}
            items={globalDictionaries.car.facility.seat.pets.type.options.items}
            selected={state.vehicle_filters.pets.selected}
            onSelect={handleSelectPets}
          />
        </div>

        {/* cta */}

        <Button onClick={handleClickApply}>
          {dictionaries.vehicle_filters.cta.apply.children}
        </Button>
      </div>
    </Modal>
  );
};
