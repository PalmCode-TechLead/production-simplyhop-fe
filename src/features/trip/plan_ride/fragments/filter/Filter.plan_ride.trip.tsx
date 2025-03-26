"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteCity } from "@/core/components/autocomplete_city";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { useRestGooglePostRouteDirections } from "../../react_query/hooks";
import { DropdownPassenger } from "@/core/components/dropdown_passenger";
import { Button } from "@/core/components/button";
import {
  fetchAutocompleteCityList,
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
import { AutocompleteAuto } from "@/core/components/autocomplete_auto";

export const FilterPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(PlanRideTripContext);

  const { mutate: fetchRestGooglePostRouteDirections } =
    useRestGooglePostRouteDirections();

  const handleQueryAuto = async (input: string) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          query: input,
        },
      },
    });
  };

  const handleSelectAuto = async (data: { id: string; name: string }) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          selected: data,
        },
      },
    });
  };

  const handleQueryCity = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: PlanRideTripActionEnum.SetFiltersData,
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
      // data: null | google.maps.places.AutocompletePrediction[]
      data: null | { description: string; place_id: string }[]
    ) => {
      if (!!data) {
        dispatch({
          type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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

    // NOTES: reset polyline
    await dispatch({
      type: PlanRideTripActionEnum.SetMapData,
      payload: {
        ...state.map,
        polyline_path: [],
      },
    });
  };

  const handleQueryOriginRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: PlanRideTripActionEnum.SetFiltersData,
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
          type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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
        type: PlanRideTripActionEnum.SetFiltersData,
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
          type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          value: value,
        },
      },
    });
  };

  // NOTES: listen and fetch route directions
  React.useEffect(() => {
    if (
      !!state.filters.origin.selected.lat_lng &&
      !!state.filters.destination.selected.lat_lng
    ) {
      fetchRestGooglePostRouteDirections();
    }
  }, [
    state.filters.origin.selected.lat_lng,
    state.filters.destination.selected.lat_lng,
  ]);

  // NOTES: set default passenger
  const setDefaultPassenger = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          value: dictionaries.filter.form.passenger.items.map((item) => {
            return {
              id: item.id,
              value: item.value,
            };
          }),
        },
      },
    });
  };

  React.useEffect(() => {
    setDefaultPassenger();
  }, []);

  const handleClickSearch = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: true,
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full max-w-container",
        "px-[3rem] py-[3rem]",
        "bg-[#FFFFFF]",
        "rounded-[1.25rem]",
        "absolute bottom-[72px]",
        "border border-[#D3E7CE]"
      )}
      style={{
        boxShadow: "backdrop-filter: blur(20px),0px 0px 25px 0px #9C969640",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-[1fr_397px] items-center content-center justify-start justify-items-start",
          "w-full",
          "gap-[1rem]"
        )}
      >
        <p className={clsx("text-[2rem] text-[#292929] font-bold")}>
          {dictionaries.filter.title}
        </p>
        <AutocompleteAuto
          {...dictionaries.filter.form.auto}
          selected={state.filters.auto.selected}
          items={state.filters.auto.items.filter((item) =>
            item.name
              .toLowerCase()
              .includes(state.filters.auto.query.toLowerCase())
          )}
          debounceQuery
          onQuery={handleQueryAuto}
          onSelect={handleSelectAuto}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {/* form */}
        <div
          className={clsx(
            "grid grid-cols-[1fr_2fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
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
        </div>

        {/* button */}
        <Button
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
        </Button>
      </div>
    </div>
  );
};
