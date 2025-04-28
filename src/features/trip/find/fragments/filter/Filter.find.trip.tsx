"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { FindTripActionEnum, FindTripContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { useRestGooglePostRouteDirections } from "../../react_query/hooks";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { RIDE_FILTER } from "@/core/enums";
import dayjs from "dayjs";
import { Button } from "@/core/components/button";
import {
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormPassenger } from "@/core/components/form_passenger";
import { FormRoutes } from "@/core/components/form_routes";

export const FilterFindTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(FindTripContext);
  const { isLg } = useTailwindBreakpoint();

  const { mutate: fetchRestGooglePostRouteDirections } =
    useRestGooglePostRouteDirections();

  const handleClickOriginRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseOriginRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
          },
        },
      },
    });
  };

  const handleQueryOriginRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindTripActionEnum.SetFiltersData,
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
          type: FindTripActionEnum.SetFiltersData,
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

    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          page_sheet: {
            ...state.filters.origin,
            is_open: false,
          },
          selected: {
            ...state.filters.origin.selected,
            item: data,
            lat_lng: lat_lng,
          },
        },
      },
    });
  };

  const handleClickDestinationRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseDestinationRoutes = () => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: false,
          },
        },
      },
    });
  };

  const handleQueryDestinationRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindTripActionEnum.SetFiltersData,
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
          type: FindTripActionEnum.SetFiltersData,
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
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        destination: {
          ...state.filters.destination,
          page_sheet: {
            ...state.filters.destination.page_sheet,
            is_open: false,
          },
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
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        date: {
          selected: date,
        },
      },
    });
  };

  const handleChangePassenger = (data: { id: string; value: number }[]) => {
    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        passenger: {
          ...state.filters.passenger,
          value: data,
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
      type: FindTripActionEnum.SetFiltersData,
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
  };

  React.useEffect(() => {
    setDefaultPassenger();
  }, []);

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
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2rem]",
          "w-[100vw] lg:w-[calc(100vw-2rem)] container:w-full container:max-w-container",
          "px-[1rem] py-[1rem] sm:px-[3rem] sm:py-[3rem]",
          "bg-[#FFFFFF]",
          "rounded-tr-[1.25rem] rounded-tl-[1.25rem] lg:rounded-[1.25rem]",
          "border border-[#D3E7CE]"
        )}
        style={{
          boxShadow: "backdrop-filter: blur(20px),0px 0px 25px 0px #9C969640",
        }}
      >
        <p
          className={clsx(
            "text-[1.125rem] sm:text-[2rem] text-[#292929] font-bold"
          )}
        >
          {dictionaries.filter.title}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* form */}
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
              "w-full",
              "relative"
            )}
          >
            <FormRoutes
              origin={{
                pageSheet: {
                  selected: state.filters.origin.selected.item,
                  items: state.filters.origin.items,
                  onQuery: (data: string) => handleQueryOriginRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectOriginRoutes(data),
                  isOpen: state.filters.origin.page_sheet.is_open,
                  title: dictionaries.filter.form.origin.title,
                  onClose: handleCloseOriginRoutes,
                  inputProps: {
                    ...dictionaries.filter.form.origin.inputProps,
                  },
                  labelProps: {
                    ...dictionaries.filter.form.origin.labelProps,
                  },
                },
                autocomplete: {
                  selected: state.filters.origin.selected.item,
                  items: state.filters.origin.items,
                  onQuery: (data: string) => handleQueryOriginRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectOriginRoutes(data),
                },
                inputProps: {
                  ...dictionaries.filter.form.origin.inputProps,
                  onClick: () => {
                    if (!isLg) {
                      handleClickOriginRoutes();
                    }
                  },
                },
                labelProps: {
                  ...dictionaries.filter.form.origin.labelProps,
                },
              }}
              destination={{
                pageSheet: {
                  selected: state.filters.destination.selected.item,
                  items: state.filters.destination.items,
                  onQuery: (data: string) => handleQueryDestinationRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectDestinationRoutes(data),
                  isOpen: state.filters.destination.page_sheet.is_open,
                  title: dictionaries.filter.form.destination.title,
                  onClose: handleCloseDestinationRoutes,
                  inputProps: {
                    ...dictionaries.filter.form.destination.inputProps,
                  },
                  labelProps: {
                    ...dictionaries.filter.form.destination.labelProps,
                  },
                },
                autocomplete: {
                  selected: state.filters.destination.selected.item,
                  items: state.filters.destination.items,
                  onQuery: (data: string) => handleQueryDestinationRoutes(data),
                  onSelect: (data: { id: string; name: string }) =>
                    handleSelectDestinationRoutes(data),
                },
                inputProps: {
                  ...dictionaries.filter.form.destination.inputProps,
                  onClick: () => {
                    if (!isLg) {
                      handleClickDestinationRoutes();
                    }
                  },
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
                  onChange: handleChangePassenger,
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
          </div>

          {/* button */}
          <Button
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
      </div>
    </>
  );
};
