"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AutocompleteCity } from "@/core/components/autocomplete_city";
import { AutocompleteRoutes } from "@/core/components/autocomplete_routes";

// Debounce function untuk mengurangi jumlah permintaan API
function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export const FilterFindRide = () => {
  const dictionaries = getDictionaries();

  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const autocompleteService = new google.maps.places.AutocompleteService();

      const fetchPredictions = (input: string) => {
        if (!input) {
          setSuggestions([]);
          return;
        }

        autocompleteService.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: "de" }, // Only Germany
            types: ["(cities)"], // Hanya kota
          },
          (predictions, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setSuggestions(predictions.map((p) => p.description));
            }
          }
        );
      };

      const debounceFetch = debounce(fetchPredictions, 300);
      setQuery((prev) => {
        debounceFetch(prev);
        return prev;
      });
    }
  }, [query]);

  const handleQuery = (value: string) => {
    setQuery(value);
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
            items={suggestions.map((item) => {
              return { id: item, name: item };
            })}
            onQuery={handleQuery}
          />
          <AutocompleteRoutes
            start={{
              ...dictionaries.filter.form.start,
            }}
            end={{
              ...dictionaries.filter.form.end,
            }}
            onQuery={handleQuery}
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
