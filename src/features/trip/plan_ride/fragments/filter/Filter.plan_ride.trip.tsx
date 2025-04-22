"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import {
  useGetVehicleMy,
  useRestGoogleGetDistanceMatrix,
  useRestGooglePostRouteDirections,
} from "../../react_query/hooks";
import { Button } from "@/core/components/button";
import {
  fetchAutocompletePlace,
  getLatLngFromPlaceId,
} from "@/core/utils/map/functions";
// import { FormPassenger } from "@/core/components/form_passenger";
import { FormAuto } from "@/core/components/form_auto";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormRoutes } from "@/core/components/form_routes";
import { Textfield } from "@/core/components/textfield";
import { MoonLoader } from "@/core/components/moon_loader";

export const FilterPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const { isLg } = useTailwindBreakpoint();
  useGetVehicleMy();

  const { mutate: fetchRestGooglePostRouteDirections } =
    useRestGooglePostRouteDirections();

  const {
    mutateAsync: fetchRestGoogleGetDistanceMatrix,
    isPending: isPendingFetchRestGoogleGetDistanceMatrix,
  } = useRestGoogleGetDistanceMatrix();

  const handleClickAuto = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          bottom_sheet: {
            ...state.filters.auto.bottom_sheet,
            is_open: true,
          },
        },
      },
    });
  };

  const handleCloseAuto = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        auto: {
          ...state.filters.auto,
          bottom_sheet: {
            ...state.filters.auto.bottom_sheet,
            is_open: false,
          },
        },
      },
    });
  };

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

  const handleClickOriginRoutes = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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

    dispatch({
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
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
          },
        },
      },
    });
  };

  const handleClickDestinationRoutes = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
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
      type: PlanRideTripActionEnum.SetFiltersData,
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

    dispatch({
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
          page_sheet: {
            ...state.filters.origin.page_sheet,
            is_open: false,
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

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        time: {
          ...state.filters.time,
          value: e.currentTarget.value,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            time: {
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  // const handleSubmitPassenger = (data: {
  //   car_seat: {
  //     checked: boolean;
  //   };
  //   value: { id: string; value: number }[];
  // }) => {
  //   dispatch({
  //     type: PlanRideTripActionEnum.SetFiltersData,
  //     payload: {
  //       ...state.filters,
  //       passenger: {
  //         ...state.filters.passenger,
  //         car_seat: {
  //           ...state.filters.passenger.car_seat,
  //           checked: data.car_seat.checked,
  //         },
  //         value: data.value,
  //       },
  //     },
  //   });
  // };

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

  const handleClickSearch = async () => {
    const data = await fetchRestGoogleGetDistanceMatrix();
    if (!data) return;
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: true,
        distance_matrix: data,
      },
    });
  };

  const isSubmitDisabled =
    !state.filters.auto.selected ||
    !state.filters.origin.selected.item ||
    !state.filters.destination.selected.item ||
    !state.filters.date.selected ||
    !state.filters.time.value.length ||
    !state.filters.passenger.value.length ||
    isPendingFetchRestGoogleGetDistanceMatrix;

  const isSubmitLoading = isPendingFetchRestGoogleGetDistanceMatrix;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem] sm:gap-[2rem]",
        "w-[100vw] lg:max-w-[calc(100vw-2rem)] container:w-full container:max-w-container",
        "px-[1rem] py-[1rem] sm:px-[3rem] sm:py-[3rem]",
        "bg-[#FFFFFF]",
        "rounded-tr-[1.25rem] rounded-tl-[1.25rem] lg:rounded-[1.25rem]",
        "absolute left-[50%] translate-x-[-50%] bottom-[0px] lg:bottom-[72px]",
        "border border-[#D3E7CE]"
      )}
      style={{
        boxShadow: "backdrop-filter: blur(20px),0px 0px 25px 0px #9C969640",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-[1fr_397px] items-center content-center justify-start justify-items-start",
          "w-full",
          "gap-[1rem]"
        )}
      >
        <p
          className={clsx(
            "text-[1.125rem] sm:text-[2rem] text-[#292929] font-bold"
          )}
        >
          {dictionaries.filter.title}
        </p>

        <FormAuto
          bottomSheet={{
            selected: state.filters.auto.selected,
            items: state.filters.auto.items,
            onQuery: (data: string) => handleQueryAuto(data),
            onSelect: (data: { id: string; name: string }) =>
              handleSelectAuto(data),
            isOpen: state.filters.auto.bottom_sheet.is_open,
            title: dictionaries.filter.form.auto.title,
            onClose: handleCloseAuto,
            inputProps: {
              ...dictionaries.filter.form.auto.inputProps,
            },
            labelProps: {
              ...dictionaries.filter.form.auto.labelProps,
            },
          }}
          inputProps={{
            ...dictionaries.filter.form.auto.inputProps,
            onClick: () => {
              if (!isLg) {
                handleClickAuto();
              }
            },
          }}
          labelProps={{
            ...dictionaries.filter.form.auto.labelProps,
          }}
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
            "grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
            "w-full"
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

          <Textfield
            labelProps={{
              ...dictionaries.detail.plan.form.input.time.labelProps,
            }}
            inputProps={{
              ...dictionaries.detail.plan.form.input.time.inputProps,
              type: "time",
              value: state.filters.time.value,
              onChange: handleChangeTime,
            }}
          />

          {/* <FormPassenger
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
          /> */}
        </div>

        {/* button */}
        <Button
          variant="tertiary"
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickSearch}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.filter.cta.primary.children}
        </Button>
      </div>
    </div>
  );
};
