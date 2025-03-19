"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteCity } from "@/core/components/autocomplete_city";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";
import { FindRideActionEnum, FindRideContext } from "../../context";

export const FilterFindRide = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(FindRideContext);

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
          types: ["geocode"], // Mengembalikan alamat, bukan hanya kota
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
          start: {
            ...state.filters.start,
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

  const handleQueryStartRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindRideActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          start: {
            ...state.filters.start,
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
            start: {
              ...state.filters.start,
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

  const handleQueryEndRoutes = async (input: string) => {
    if (!input.length) {
      dispatch({
        type: FindRideActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          end: {
            ...state.filters.end,
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
            end: {
              ...state.filters.end,
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

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full max-w-container",
        "px-[3rem] py-[3rem]",
        "bg-[#FFFFFFCC]",
        "rounded-[1.25rem]",
        "absolute bottom-[72px]"
      )}
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
            start={{
              autocomplete: {
                selected: state.filters.start.selected,
                items: state.filters.start.items,
                onQuery: (data: string) => handleQueryStartRoutes(data),
              },
              inputProps: {
                ...dictionaries.filter.form.start.inputProps,
              },
              labelProps: {
                ...dictionaries.filter.form.start.labelProps,
              },
            }}
            end={{
              autocomplete: {
                selected: state.filters.end.selected,
                items: state.filters.end.items,
                onQuery: (data: string) => handleQueryEndRoutes(data),
              },
              inputProps: {
                ...dictionaries.filter.form.end.inputProps,
              },
              labelProps: {
                ...dictionaries.filter.form.end.labelProps,
              },
            }}
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
