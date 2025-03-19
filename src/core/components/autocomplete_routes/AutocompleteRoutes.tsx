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
  start?: {
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
  end?: {
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

  start = {
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
  end = {
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
  const [startAutocomplete, setStartAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });
  const [endAutocomplete, setEndAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const isOpen = startAutocomplete.isOpen || endAutocomplete.isOpen;

  // const [isFocus, setIsFocus] = useState<boolean>(false);
  // const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  const startDebounced = useDebounceCallback(start.autocomplete.onQuery, 500);
  const endDebounced = useDebounceCallback(end.autocomplete.onQuery, 500);
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(containerRef, () => {
  //   setQuery(selected?.name ?? "");
  //   setIsFocus(false);
  //   setIsOpen(false);
  // });

  const startFilteredItems = !startAutocomplete.query.length
    ? start.autocomplete?.items ?? []
    : type === "async"
    ? start.autocomplete?.items ?? []
    : !search
    ? start.autocomplete?.items ?? []
    : (start.autocomplete?.items ?? []).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(startAutocomplete.query.toLowerCase().replace(/\s+/g, ""))
      );

  const endFilteredItems = !endAutocomplete.query.length
    ? end.autocomplete?.items ?? []
    : type === "async"
    ? end.autocomplete?.items ?? []
    : !search
    ? end.autocomplete?.items ?? []
    : (end.autocomplete?.items ?? []).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(endAutocomplete.query.toLowerCase().replace(/\s+/g, ""))
      );

  const handleChangeStart = (data: { id: string; name: string }) => {
    if (start.autocomplete?.onSelect) {
      start.autocomplete?.onSelect(data);
    }
    setStartAutocomplete({
      ...startAutocomplete,
      query: data.name ?? "",
      isOpen: false,
    });
  };

  const handleChangeEnd = (data: { id: string; name: string }) => {
    if (end.autocomplete?.onSelect) {
      end.autocomplete?.onSelect(data);
    }
    setEndAutocomplete({
      ...endAutocomplete,
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
              "items-end content-end",
              "w-full h-full",
              "relative"
            )}
          >
            <Input
              ref={startInputRef}
              {...start.inputProps}
              value={startAutocomplete.query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setStartAutocomplete({
                  ...startAutocomplete,
                  isFocus: true,
                });
              }}
              onBlur={() => {
                // setIsFocus(false);
                setStartAutocomplete({
                  ...startAutocomplete,
                  isFocus: false,
                });
              }}
              onChange={(event) => {
                setStartAutocomplete({
                  ...startAutocomplete,
                  query: event.target.value,
                  isOpen: !!event.target.value.length,
                });
                if (start.autocomplete?.debounceQuery) {
                  startDebounced(event.target.value);
                } else {
                  start.autocomplete.onQuery(event.target.value);
                }
              }}
            />

            <InputLabel
              {...start.labelProps}
              className={clsx(
                // !!query
                !!startAutocomplete.query
                  ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
                  : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                // setIsOpen(true);
                startInputRef.current?.focus();
              }}
            />

            <div className={clsx("bg-[#E0ECDC]", "w-[1px] h-full")} />

            <Input
              ref={endInputRef}
              {...end.inputProps}
              value={endAutocomplete.query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setEndAutocomplete({
                  ...endAutocomplete,
                  isFocus: true,
                });
              }}
              onBlur={() => {
                setEndAutocomplete({
                  ...endAutocomplete,
                  isFocus: false,
                });
              }}
              onChange={(event) => {
                setEndAutocomplete({
                  ...endAutocomplete,
                  query: event.target.value,
                  isOpen: !!event.target.value.length,
                });
                if (end.autocomplete?.debounceQuery) {
                  endDebounced(event.target.value);
                } else {
                  end.autocomplete.onQuery(event.target.value);
                }
              }}
            />

            <InputLabel
              {...end.labelProps}
              className={clsx(
                !!endAutocomplete.query
                  ? "top-[25%] left-[calc(50%+1rem)] translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-[calc(50%+1rem)] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                endInputRef.current?.focus();
                // setIsOpen(true);
              }}
            />
          </div>
        </InputContainer>

        {!start.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {startAutocomplete.isFocus &&
            startFilteredItems.length === 0 &&
            startAutocomplete.query !== "" ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              startFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  // className={clsx(
                  //   selected?.id === item.id
                  //     ? "font-bold text-[#FF6201]"
                  //     : "font-normal text-[#201E2C]"
                  // )}
                  onClick={() => handleChangeStart(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}

            {endAutocomplete.isFocus &&
            endFilteredItems.length === 0 &&
            endAutocomplete.query !== "" ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              endFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  // className={clsx(
                  //   selected?.id === item.id
                  //     ? "font-bold text-[#FF6201]"
                  //     : "font-normal text-[#201E2C]"
                  // )}
                  onClick={() => handleChangeEnd(item)}
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
