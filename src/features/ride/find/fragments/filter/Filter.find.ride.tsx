"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteCity } from "@/core/components/autocomplete_city";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";
import { FindRideActionEnum, FindRideContext } from "../../context";
import { DatePicker } from "@/core/components/datepicker";
import { useRestGooglePostRouteDirections } from "../../react_query/hooks";

export const FilterFindRide = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(FindRideContext);

  const { mutate: fetchRestGooglePostRouteDirections } =
    useRestGooglePostRouteDirections();

  const fetchAutocompleteCityList = async (
    input: string,
    callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
  ) => {
    if (typeof window !== "undefined" && window.google) {
      const autocompleteService = new google.maps.places.AutocompleteService();

      await autocompleteService.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: "de" },
          types: ["(cities)"],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            callback(predictions);
          } else {
            callback(null);
          }
        }
      );
    }
  };

  const fetchAutocompletePlace = async (
    input: string,
    coordinate: { lat: number; lng: number } | null,
    callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
  ) => {
    if (typeof window !== "undefined" && window.google && !!coordinate) {
      const autocompleteService = new google.maps.places.AutocompleteService();

      await autocompleteService.getPlacePredictions(
        {
          input: input,
          componentRestrictions: { country: "de" },
          types: ["establishment"],
          locationBias: new google.maps.Circle({
            center: new google.maps.LatLng(coordinate.lat, coordinate.lng), // Pusat Munich
            radius: 20000, // Radius 20km dari pusat Munich
          }),
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            callback(predictions);
          } else {
            callback(null);
          }
        }
      );
    }
  };

  const getLatLngFromPlaceId = (
    placeId: string
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      // Membuat service tanpa perlu inisialisasi map
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails({ placeId }, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        } else {
          reject(new Error(`Failed to get location: ${status}`));
        }
      });
    });
  };

  const handleQueryCity = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindRideActionEnum.SetFiltersData,
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
          type: FindRideActionEnum.SetFiltersData,
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
      throw new Error("Err get lat lng");
    }

    await dispatch({
      type: FindRideActionEnum.SetFiltersData,
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
      },
    });
  };

  const handleQueryOriginRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindRideActionEnum.SetFiltersData,
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
          type: FindRideActionEnum.SetFiltersData,
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
      throw new Error("Err get lat lng");
    }

    await dispatch({
      type: FindRideActionEnum.SetFiltersData,
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
        type: FindRideActionEnum.SetFiltersData,
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
          type: FindRideActionEnum.SetFiltersData,
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
      throw new Error("Err get lat lng");
    }

    await dispatch({
      type: FindRideActionEnum.SetFiltersData,
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

  const handleSelectDate = (date: Date) => {
    //
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
      <p className={clsx("text-[2rem] text-[#292929] font-bold")}>
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
            "grid grid-cols-[1fr_2fr_1fr_1fr] place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <AutocompleteCity
            {...dictionaries.filter.form.city}
            items={state.filters.city.items}
            debounceQuery
            onQuery={handleQueryCity}
            onSelect={handleSelectCity}
          />
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
            // value={dateValue}
            onSelect={handleSelectDate}
          />
        </div>

        {/* button */}
        <button
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full",
            "bg-[#5AC53D]",
            "py-[1rem]",
            "rounded-[0.375rem]",
            "text-[1rem] text-[#FFFFFF] font-medium"
          )}
        >
          {dictionaries.filter.cta.primary.children}
        </button>
      </div>
    </div>
  );
};
