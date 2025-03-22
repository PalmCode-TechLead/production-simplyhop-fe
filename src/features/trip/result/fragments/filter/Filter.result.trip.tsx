"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteCity } from "@/core/components/autocomplete_city";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";
import {
  ResultTripActionEnum,
  ResultTripContext,
  useRideFilterResultTrip,
} from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { DropdownPassenger } from "@/core/components/dropdown_passenger";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { RIDE_FILTER } from "@/core/enums";
import dayjs from "dayjs";
import {
  fetchAutocompleteCityList,
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";

export const FilterResultTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);

  useRideFilterResultTrip();

  const handleQueryCity = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: ResultTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          city: {
            ...state.filters.city,
            items: [],
          },
        },
      });
      return;
    }
    const handleResult = (
      data: null | google.maps.places.AutocompletePrediction[]
    ) => {
      if (!!data) {
        dispatch({
          type: ResultTripActionEnum.SetFiltersData,
          payload: {
            ...state.filters,
            city: {
              ...state.filters.city,
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
    await fetchAutocompleteCityList(input, handleResult);
  };

  const handleSelectCity = async (data: { id: string; name: string }) => {
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
        city: {
          ...state.filters.city,
          selected: {
            ...state.filters.city.selected,
            item: data,
            lat_lng: lat_lng,
          },
        },
        // NOTES: reset origin and destination
        origin: {
          ...state.filters.origin,
          selected: {
            ...state.filters.origin.selected,
            item: null,
            lat_lng: null,
          },
        },
        destination: {
          ...state.filters.destination,
          selected: {
            ...state.filters.destination.selected,
            item: null,
            lat_lng: null,
          },
        },
      },
    });
  };

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
      data: null | google.maps.places.AutocompletePrediction[]
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
      state.filters.city.selected.lat_lng,
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
      data: null | google.maps.places.AutocompletePrediction[]
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
      state.filters.city.selected.lat_lng,
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
      console.log(lat_lng, "ini lat_lng");
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

  const handleChangePassenger = (value: { id: string; value: number }[]) => {
    dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          value: value,
        },
      },
    });
  };

  // NOTES: set default passenger
  // const setDefaultPassenger = () => {
  //   dispatch({
  //     type: ResultTripActionEnum.SetFiltersData,
  //     payload: {
  //       ...state.filters,
  //       passenger: {
  //         ...state.filters.passenger,
  //         value: dictionaries.filter.form.passenger.items.map((item) => {
  //           return {
  //             id: item.id,
  //             value: item.value,
  //           };
  //         }),
  //       },
  //     },
  //   });
  // };

  // React.useEffect(() => {
  //   setDefaultPassenger();
  // }, []);

  const handleClickSearch = () => {
    let params = "";
    if (state.filters.city.selected.item) {
      const city = `${RIDE_FILTER.CITY}=${state.filters.city.selected.item.id}`;
      params = params + city;
    }
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
            "grid grid-cols-[1fr_2fr_1fr_1fr_auto] place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <AutocompleteCity
            {...dictionaries.filter.form.city}
            selected={state.filters.city.selected.item}
            items={state.filters.city.items}
            debounceQuery
            onQuery={handleQueryCity}
            onSelect={handleSelectCity}
          />
          <AutocompleteRoutes
            disabled={!state.filters.city.selected.item}
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

          <DropdownPassenger
            labelProps={{
              ...dictionaries.filter.form.passenger.labelProps,
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
            items={dictionaries.filter.form.passenger.items.map((item) => {
              return {
                ...item,
                value:
                  state.filters.passenger.value.find(
                    (passengerItem) => passengerItem.id === item.id
                  )?.value ?? 0,
              };
            })}
            onChange={handleChangePassenger}
          />

          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "bg-[#5AC53D]",
              "py-[1rem]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#FFFFFF] font-medium",
              "disabled:opacity-50",
              "px-[1.25rem] py-[0.75rem]"
            )}
            disabled={
              !state.filters.city.selected.item ||
              !state.filters.origin.selected.item ||
              !state.filters.destination.selected.item ||
              !state.filters.date.selected ||
              !state.filters.passenger.value.length
            }
            onClick={handleClickSearch}
          >
            {dictionaries.filter.cta.primary.children}
          </button>
        </div>

        {/* button */}
      </div>
    </div>
  );
};
