import { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";

import {
  useIntersectionObserver,
  useDebounceCallback,
  useOnClickOutside,
} from "usehooks-ts";
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
    autocomplete?: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
    };
  };
  end?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete?: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
    };
  };

  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  onLoadMore?: () => void;
}

export const AutocompleteRoutes = ({
  type = "sync",

  disabled = false,

  emptyMessage = "No Result",
  search = true,
  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
  start = {
    autocomplete: {
      selected: null,
      items: [],
      disabled: false,
      emptyMessage: "",
      debounceQuery: false,
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
    },
    inputProps: {},
    labelProps: {},
  },

  onQuery = (data: string) => {},
  onLoadMore = () => {},
}: AutocompleteRoutesProps) => {
  const [startAutocomplete, setStartAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
  }>({
    isFocus: false,
    query: "",
  });
  const [endAutocomplete, setEndAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
  }>({
    isFocus: false,
    query: "",
  });
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const [isFocus, setIsFocus] = useState<boolean>(false);
  // const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(containerRef, () => {
  //   setQuery(selected?.name ?? "");
  //   setIsFocus(false);
  //   setIsOpen(false);
  // });

  const { ref, isIntersecting } = useIntersectionObserver();

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

  // const handleChange = (data: { id: string; name: string }) => {
  //   onSelect(data);
  //   setQuery(data.name ?? "");
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   setQuery(selected?.name ?? "");
  // }, [selected?.name]);

  useEffect(() => {
    if (isIntersecting && type === "async") {
      onLoadMore();
    }
  }, [isIntersecting, type]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer
          className={clsx(
            // isFocus
            //   ? "items-end content-end"
            //   : !!query.length
            //   ? "items-end content-end"
            //   : "items-center content-center"
            "items-end content-end"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-[1fr_auto_1fr] gap-[1rem]",
              // isFocus
              //   ? "items-end content-end"
              //   : !!query.length
              //   ? "items-end content-end"
              //   : "items-center content-center",
              "items-end content-end",
              "w-full",
              "relative"
            )}
          >
            <Input
              // ref={inputRef}
              ref={startInputRef}
              {...start.inputProps}
              // value={query}
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
                setIsOpen(!!event.target.value.length);
                setStartAutocomplete({
                  ...startAutocomplete,
                  query: event.target.value,
                });
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
                // setIsOpen(!!event.target.value.length);
                // setQuery(event.target.value);
                // if (debounceQuery) {
                //   debounced(event.target.value);
                // } else {
                //   onQuery(event.target.value);
                // }
              }}
            />

            <InputLabel
              {...start.labelProps}
              className={clsx(
                // !!query
                !!startAutocomplete.query
                  ? "top-[-16px] text-[0.75rem]"
                  : "left-0 top-0 text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                // setIsOpen(true);
                startInputRef.current?.focus();
              }}
            />

            <div className={clsx("bg-[#E0ECDC]", "w-[1px] h-full")} />

            <Input
              // ref={inputRef}
              ref={endInputRef}
              {...end.inputProps}
              // value={query}
              value={endAutocomplete.query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                // setIsFocus(true);
                setEndAutocomplete({
                  ...endAutocomplete,
                  isFocus: true,
                });
              }}
              onBlur={() => {
                // setIsFocus(false);
                setEndAutocomplete({
                  ...endAutocomplete,
                  isFocus: false,
                });
              }}
              onChange={(event) => {
                setIsOpen(!!event.target.value.length);
                // setQuery(event.target.value);
                setEndAutocomplete({
                  ...endAutocomplete,
                  query: event.target.value,
                });
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
              }}
            />

            <InputLabel
              {...end.labelProps}
              className={clsx(
                // !!query
                !!endAutocomplete.query
                  ? "top-[-16px] text-[0.75rem]"
                  : "left-[calc(50%+1rem)] top-0 text-[0.75rem]"
              )}
              onClick={() => {
                // inputRef.current?.focus();
                endInputRef.current?.focus();
                // setIsOpen(true);
              }}
            />
          </div>
        </InputContainer>

        {!disabled && (
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
                  // onClick={() => handleChange(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}

            <div
              ref={ref}
              className={clsx("opacity-0", "h-[0px]", "overflow-hidden")}
            >
              Bottom
            </div>
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};
