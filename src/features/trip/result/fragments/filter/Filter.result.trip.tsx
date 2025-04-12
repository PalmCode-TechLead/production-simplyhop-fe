"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";
import {
  ResultTripActionEnum,
  ResultTripContext,
  useRideFilterResultTrip,
} from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { RIDE_FILTER } from "@/core/enums";
import dayjs from "dayjs";
import {
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
import { Button } from "@/core/components/button";
import { FormPassenger } from "@/core/components/form_passenger";

export const FilterResultTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);

  useRideFilterResultTrip();

  const handleQueryOriginRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: ResultTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          origin: {
            ...state.filters.origin,
            items: [],
          },
        },
      });
      return;
    }

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: ResultTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            origin: {
              ...state.filters.origin,
              items: data.map((p) => {
                return {
                  id: p.place_id,
                  name: p.description,
                };
              }),
            },
          },
        });
      }
    };

    await fetchAutocompletePlace(
      input,
      // state.filters.city.selected.lat_lng,
      handleResult
    );
  };

  const handleSelectOriginRoutes = async (data: {
    id: string;
    name: string;
  }) => {
    let lat_lng: null | { lat: number; lng: number } = null;
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    await dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          selected: {
            ...state.filters.origin.selected,
            item: data,
            lat_lng: lat_lng,
          },
        },
      },
    });
  };

  const handleQueryDestinationRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: ResultTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          destination: {
            ...state.filters.destination,
            items: [],
          },
        },
      });
      return;
    }

    const handleResult = (
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: ResultTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            destination: {
              ...state.filters.destination,
              items: data.map((p) => {
                return {
                  id: p.place_id,
                  name: p.description,
                };
              }),
            },
          },
        });
      }
    };

    await fetchAutocompletePlace(
      input,
      // state.filters.city.selected.lat_lng,
      handleResult
    );
  };

  const handleSelectDestinationRoutes = async (data: {
    id: string;
    name: string;
  }) => {
    let lat_lng: null | { lat: number; lng: number } = null;
    try {
      const response = await getLatLngFromPlaceId(data.id);
      lat_lng = {
        lat: response.lat,
        lng: response.lng,
      };
    } catch (err) {
      throw new Error(`Err get lat lng ${err}`);
    }

    await dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          selected: {
            ...state.filters.destination.selected,
            item: data,
            lat_lng: lat_lng,
          },
        },
      },
    });
  };

  const handleSelectDate = (date: Date) => {
    dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        date: {
          selected: date,
        },
      },
    });
  };

  const handleSubmitPassenger = (data: {
    car_seat: {
      checked: boolean;
    };
    value: { id: string; value: number }[];
  }) => {
    dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          car_seat: {
            ...state.filters.passenger.car_seat,
            checked: data.car_seat.checked,
          },
          value: data.value,
        },
      },
    });
  };

  const handleClickSearch = () => {
    let params = "";
    if (state.filters.origin.selected.item) {
      const origin = `&${RIDE_FILTER.ORIGIN}=${state.filters.origin.selected.item.id}`;
      params = params + origin;
    }
    if (state.filters.destination.selected.item) {
      const destination = `&${RIDE_FILTER.DESTINATION}=${state.filters.destination.selected.item.id}`;
      params = params + destination;
    }
    if (state.filters.date.selected) {
      const date = `&${RIDE_FILTER.DATE}=${dayjs(
        state.filters.date.selected
      ).format("YYYY-MM-DD")}`;
      params = params + date;
    }
    if (state.filters.passenger.value) {
      const adult = `&${RIDE_FILTER.ADULT_PASSENGER}=${
        state.filters.passenger.value.find(
          (passengerItem) => passengerItem.id === "adult"
        )?.value ?? 0
      }`;
      params = params + adult;

      const children = `&${RIDE_FILTER.CHILDREN_PASSENGER}=${
        state.filters.passenger.value.find(
          (passengerItem) => passengerItem.id === "children"
        )?.value ?? 0
      }`;
      params = params + children;
    }
    if (state.filters.passenger.car_seat.checked) {
      const carSeat = `&${RIDE_FILTER.CAR_SEAT}=true`;
      params = params + carSeat;
    }
    router.push(AppCollectionURL.public.tripResult(params));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full max-w-container",
        "px-[1rem] py-[0.75rem]",
        "bg-[#FFFFFF]",
        "rounded-[1.25rem]"
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 15px 0px #0A31001A",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {/* form */}
        <div
          className={clsx(
            "grid grid-cols-[2fr_1fr_1fr_auto] place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <AutocompleteRoutes
            origin={{
              autocomplete: {
                selected: state.filters.origin.selected.item,
                items: state.filters.origin.items,
                onQuery: (data: string) => handleQueryOriginRoutes(data),
                onSelect: (data: { id: string; name: string }) =>
                  handleSelectOriginRoutes(data),
              },
              inputProps: {
                ...dictionaries.filter.form.origin.inputProps,
              },
              labelProps: {
                ...dictionaries.filter.form.origin.labelProps,
              },
            }}
            destination={{
              autocomplete: {
                selected: state.filters.destination.selected.item,
                items: state.filters.destination.items,
                onQuery: (data: string) => handleQueryDestinationRoutes(data),
                onSelect: (data: { id: string; name: string }) =>
                  handleSelectDestinationRoutes(data),
              },
              inputProps: {
                ...dictionaries.filter.form.destination.inputProps,
              },
              labelProps: {
                ...dictionaries.filter.form.destination.labelProps,
              },
            }}
          />

          <DatePicker
            labelProps={{
              ...dictionaries.filter.form.date.labelProps,
            }}
            value={state.filters.date.selected}
            onSelect={handleSelectDate}
          />

          <FormPassenger
            labelProps={{
              ...dictionaries.filter.form.passenger.labelProps,
            }}
            detail={{
              title: dictionaries.filter.form.passenger.detail.title,
              carSeat: {
                input: {
                  ...dictionaries.filter.form.passenger.detail.carSeat.input,
                  checked: state.filters.passenger.car_seat.checked,
                },
              },
              cta: dictionaries.filter.form.passenger.detail.cta,
              passenger: {
                items: dictionaries.filter.form.passenger.detail.items.map(
                  (item) => {
                    return {
                      ...item,
                      value:
                        state.filters.passenger.value.find(
                          (passengerItem) => passengerItem.id === item.id
                        )?.value ?? 0,
                    };
                  }
                ),
              },
              onSelect: handleSubmitPassenger,
            }}
            maskedValue={dictionaries.filter.form.passenger.maskedValue
              .replaceAll(
                "{{adult}}",
                String(
                  state.filters.passenger.value.find(
                    (item) => item.id === "adult"
                  )?.value ?? 0
                )
              )
              .replaceAll(
                "{{children}}",
                String(
                  state.filters.passenger.value.find(
                    (item) => item.id === "children"
                  )?.value ?? 0
                )
              )}
          />

          <Button
            className={clsx("px-[1.25rem] py-[0.75rem]")}
            disabled={
              !state.filters.origin.selected.item ||
              !state.filters.destination.selected.item ||
              !state.filters.date.selected ||
              !state.filters.passenger.value.length
            }
            onClick={handleClickSearch}
          >
            {dictionaries.filter.cta.primary.children}
          </Button>
        </div>

        {/* button */}
      </div>
    </div>
  );
};
