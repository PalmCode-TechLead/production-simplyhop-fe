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

export interface AutocompleteCityProps {
  type?: "sync" | "async";
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  emptyMessage?: string;
  search?: boolean;
  debounceQuery?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  onLoadMore?: () => void;
}

export const AutocompleteCity = ({
  type = "sync",
  selected = null,
  disabled = false,
  items = [],
  emptyMessage = "No Result",
  search = true,
  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
  inputProps,
  labelProps,
  onQuery = () => {},
  onLoadMore = () => {},
}: AutocompleteCityProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(containerRef, () => {
  //   setQuery(selected?.name ?? "");
  //   setIsFocus(false);
  //   setIsOpen(false);
  // });

  const { ref, isIntersecting } = useIntersectionObserver();

  const filteredItems = !query.length
    ? items
    : type === "async"
    ? items
    : !search
    ? items
    : items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const handleChange = (data: { id: string; name: string }) => {
    onSelect(data);
    setQuery(data.name ?? "");
    setIsOpen(false);
  };

  useEffect(() => {
    setQuery(selected?.name ?? "");
  }, [selected?.name]);

  useEffect(() => {
    if (isIntersecting && type === "async") {
      onLoadMore();
    }
  }, [isIntersecting, type]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer>
          <div
            className={clsx(
              "grid grid-cols-1 justify-start justify-items-start gap-[0.5rem]",
              "items-end content-end",
              "w-full h-full",
              "relative"
            )}
          >
            <Input
              ref={inputRef}
              {...inputProps}
              value={query}
              className={clsx("pr-[1.5rem]")}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              onChange={(event) => {
                setIsOpen(!!event.target.value.length);
                setQuery(event.target.value);
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
              }}
            />

            <div
              className={clsx(
                "flex items-center justify-center",
                "w-[1rem] h-[1rem]",
                "bg-[#E8F0E6]",
                "rounded-[50%]",
                "absolute",
                !!query
                  ? "top-[75%] right-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] right-0 translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[75%]"
              )}
            >
              <SVGIcon
                name="Navigation"
                className={clsx("w-[0.625rem] h-[0.625rem]", "text-[#5AC53D]")}
              />
            </div>

            <InputLabel
              {...labelProps}
              className={clsx(
                !!query
                  ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
                  : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                inputRef.current?.focus();
              }}
            />
          </div>
        </InputContainer>

        {!disabled && (
          <AutocompleteOptionsContainer
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {filteredItems.length === 0 && query !== "" ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              filteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  className={clsx(
                    selected?.id === item.id
                      ? "font-bold text-[#FF6201]"
                      : "font-normal text-[#201E2C]"
                  )}
                  onClick={() => handleChange(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}

            {/* NOTES: infinite scroll identifier */}
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
