import { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";

import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import SVGIcon from "../../icons";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";
import useAutocomplete from "@/core/utils/ui/hooks/useAutocomplete";

export interface AutocompleteRoutesProps {
  type?: "sync" | "async";

  disabled?: boolean;
  emptyMessage?: string;
  search?: boolean;
  debounceQuery?: boolean;
  origin?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
    };
  };
  destination?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
    };
  };
}

export const AutocompleteRoutes = ({
  type = "sync",

  disabled = false,

  emptyMessage = "No Result",
  search = true,

  origin = {
    autocomplete: {
      selected: null,
      items: [],
      disabled: false,
      emptyMessage: "",
      debounceQuery: false,
      onSelect: () => {},
      onQuery: (data: string) => {},
    },
    inputProps: {},
    labelProps: {},
  },
  destination = {
    autocomplete: {
      selected: null,
      items: [],
      disabled: false,
      emptyMessage: "",
      debounceQuery: false,
      onSelect: () => {},
      onQuery: (data: string) => {},
    },
    inputProps: {},
    labelProps: {},
  },
}: AutocompleteRoutesProps) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });
  const originInputRef = useRef<HTMLInputElement | null>(null);
  const destinationInputRef = useRef<HTMLInputElement | null>(null);
  const isOpen = originAutocomplete.isOpen || destinationAutocomplete.isOpen;

  // const [isFocus, setIsFocus] = useState<boolean>(false);
  // const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  const originDebounced = useDebounceCallback(origin.autocomplete.onQuery, 500);
  const destinationDebounced = useDebounceCallback(
    destination.autocomplete.onQuery,
    500
  );
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(containerRef, () => {
  //   setQuery(selected?.name ?? "");
  //   setIsFocus(false);
  //   setIsOpen(false);
  // });

  const originFilteredItems = !originAutocomplete.query.length
    ? origin.autocomplete?.items ?? []
    : type === "async"
    ? origin.autocomplete?.items ?? []
    : !search
    ? origin.autocomplete?.items ?? []
    : (origin.autocomplete?.items ?? []).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(originAutocomplete.query.toLowerCase().replace(/\s+/g, ""))
      );

  const destinationFilteredItems = !destinationAutocomplete.query.length
    ? destination.autocomplete?.items ?? []
    : type === "async"
    ? destination.autocomplete?.items ?? []
    : !search
    ? destination.autocomplete?.items ?? []
    : (destination.autocomplete?.items ?? []).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(
            destinationAutocomplete.query.toLowerCase().replace(/\s+/g, "")
          )
      );

  const handleChangeorigin = (data: { id: string; name: string }) => {
    if (origin.autocomplete?.onSelect) {
      origin.autocomplete?.onSelect(data);
    }
    setOriginAutocomplete({
      ...originAutocomplete,
      query: data.name ?? "",
      isOpen: false,
    });
  };

  const handleChangedestination = (data: { id: string; name: string }) => {
    if (destination.autocomplete?.onSelect) {
      destination.autocomplete?.onSelect(data);
    }
    setDestinationAutocomplete({
      ...destinationAutocomplete,
      query: data.name ?? "",
      isOpen: false,
    });
  };

  // useEffect(() => {
  //   setQuery(selected?.name ?? "");
  // }, [selected?.name]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer>
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-[1fr_auto_1fr] gap-[1rem]",
              "items-destination content-destination",
              "w-full h-full",
              "relative"
            )}
          >
            <Input
              ref={originInputRef}
              {...origin.inputProps}
              value={originAutocomplete.query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setOriginAutocomplete({
                  ...originAutocomplete,
                  isFocus: true,
                });
              }}
              onBlur={() => {
                // setIsFocus(false);
                setOriginAutocomplete({
                  ...originAutocomplete,
                  isFocus: false,
                });
              }}
              onChange={(event) => {
                setOriginAutocomplete({
                  ...originAutocomplete,
                  query: event.target.value,
                  isOpen: !!event.target.value.length,
                });
                if (origin.autocomplete?.debounceQuery) {
                  originDebounced(event.target.value);
                } else {
                  origin.autocomplete.onQuery(event.target.value);
                }
              }}
            />

            <InputLabel
              {...origin.labelProps}
              className={clsx(
                // !!query
                !!originAutocomplete.query
                  ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
                  : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                // setIsOpen(true);
                originInputRef.current?.focus();
              }}
            />

            <div className={clsx("bg-[#E0ECDC]", "w-[1px] h-full")} />

            <Input
              ref={destinationInputRef}
              {...destination.inputProps}
              value={destinationAutocomplete.query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setDestinationAutocomplete({
                  ...destinationAutocomplete,
                  isFocus: true,
                });
              }}
              onBlur={() => {
                setDestinationAutocomplete({
                  ...destinationAutocomplete,
                  isFocus: false,
                });
              }}
              onChange={(event) => {
                setDestinationAutocomplete({
                  ...destinationAutocomplete,
                  query: event.target.value,
                  isOpen: !!event.target.value.length,
                });
                if (destination.autocomplete?.debounceQuery) {
                  destinationDebounced(event.target.value);
                } else {
                  destination.autocomplete.onQuery(event.target.value);
                }
              }}
            />

            <InputLabel
              {...destination.labelProps}
              className={clsx(
                !!destinationAutocomplete.query
                  ? "top-[25%] left-[calc(50%+1rem)] translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-[calc(50%+1rem)] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                destinationInputRef.current?.focus();
                // setIsOpen(true);
              }}
            />
          </div>
        </InputContainer>

        {!origin.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {originAutocomplete.isFocus &&
            originFilteredItems.length === 0 &&
            originAutocomplete.query !== "" ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              originFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  // className={clsx(
                  //   selected?.id === item.id
                  //     ? "font-bold text-[#FF6201]"
                  //     : "font-normal text-[#201E2C]"
                  // )}
                  onClick={() => handleChangeorigin(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}

            {destinationAutocomplete.isFocus &&
            destinationFilteredItems.length === 0 &&
            destinationAutocomplete.query !== "" ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              destinationFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  // className={clsx(
                  //   selected?.id === item.id
                  //     ? "font-bold text-[#FF6201]"
                  //     : "font-normal text-[#201E2C]"
                  // )}
                  onClick={() => handleChangedestination(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};
