import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";

export interface AutocompleteRoutesProps {
  disabled?: boolean;
  emptyMessage?: string;
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
      onClick?: () => void;
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
      onClick?: () => void;
    };
  };
}

export const AutocompleteRoutes = ({
  disabled = false,

  emptyMessage = "No Result",

  origin = {
    autocomplete: {
      selected: null,
      items: [],
      disabled: false,
      emptyMessage: "",
      debounceQuery: false,
      onSelect: () => {},
      onQuery: () => {},
      onClick: () => {},
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
      onQuery: () => {},
      onClick: () => {},
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

  const containerRef = useRef<HTMLDivElement | null>(null);

  const originDebounced = useDebounceCallback(origin.autocomplete.onQuery, 500);
  const destinationDebounced = useDebounceCallback(
    destination.autocomplete.onQuery,
    500
  );

  useOnClickOutside(containerRef as any, () => {
    setOriginAutocomplete({
      query: origin.autocomplete.selected?.name ?? "",
      isFocus: false,
      isOpen: false,
    });
    setDestinationAutocomplete({
      query: destination.autocomplete.selected?.name ?? "",
      isFocus: false,
      isOpen: false,
    });
  });

  const originFilteredItems = origin.autocomplete?.items ?? [];
  const destinationFilteredItems = destination.autocomplete?.items ?? [];

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

  useEffect(() => {
    setOriginAutocomplete({
      ...originAutocomplete,
      query: origin.autocomplete.selected?.name ?? "",
    });
    setDestinationAutocomplete({
      ...destinationAutocomplete,
      query: destination.autocomplete.selected?.name ?? "",
    });
  }, [
    origin.autocomplete.selected?.name,
    destination.autocomplete.selected?.name,
  ]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer className={clsx(disabled && "!opacity-50")}>
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-[1fr_auto_1fr] gap-[1rem]",
              "items-end content-end",
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
              onClick={origin.autocomplete?.onClick}
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
              onClick={destination.autocomplete?.onClick}
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
          </AutocompleteOptionsContainer>
        )}
        {!destination.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(isOpen ? "inline" : "hidden")}
          >
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
