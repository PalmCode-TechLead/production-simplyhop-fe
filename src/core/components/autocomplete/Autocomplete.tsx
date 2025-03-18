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

export interface AutocompleteProps {
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

export const Autocomplete = ({
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
}: AutocompleteProps) => {
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
              "grid grid-cols-1 place-content-start place-items-start gap-[0.125rem]",
              "w-full",
              "relative"
            )}
          >
            <Input
              ref={inputRef}
              {...inputProps}
              value={query}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setIsFocus(true);
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

            <InputLabel
              {...labelProps}
              className={clsx(
                !!query
                  ? "top-[-16px] text-[0.75rem]"
                  : "left-0 top-0 text-[0.75rem]"
              )}
              onClick={() => {
                inputRef.current?.focus();
                setIsOpen(true);
              }}
            />
          </div>
        </InputContainer>

        {!disabled && (
          <div
            className={clsx(
              "absolute z-9999",
              "w-full",
              "max-h-[160px]",
              "overflow-auto",
              "mt-[0.5rem]",
              "bg-[white]",
              "border border-[#B5B5B5]",
              "focus:outline-none",
              "rounded-[1rem]",
              "z-[20]",
              isOpen ? "inline" : "hidden"
            )}
          >
            {filteredItems.length === 0 && query !== "" ? (
              <div
                className={clsx(
                  "relative cursor-default select-none",
                  "p-[1rem]",
                  "text-[0.875rem] text-[#201E2C] font-normal"
                )}
              >
                {emptyMessage}
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    `relative cursor-pointer select-none p-[1rem]`,
                    "bg-[white]",
                    filteredItems.length - 1 !== index
                      ? "border-b border-b-[#B5B5B5]"
                      : "border-b border-b-[#B5B5B5]"
                  )}
                  onClick={() => handleChange(item)}
                >
                  <span
                    className={clsx(
                      "text-[1rem]",
                      selected?.id === item.id
                        ? "font-bold text-[#FF6201]"
                        : "font-normal text-[#201E2C]"
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              ))
            )}

            {/* NOTES: infinite scroll identifier */}
            <div
              ref={ref}
              className={clsx("opacity-0", "h-[0px]", "overflow-hidden")}
            >
              Bottom
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
