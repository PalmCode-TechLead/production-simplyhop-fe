import { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";

import {
  useIntersectionObserver,
  useDebounceCallback,
  useOnClickOutside,
} from "usehooks-ts";
import SVGIcon from "../../icons";

export interface AutocompleteProps {
  id?: string;
  required?: boolean;
  type?: "sync" | "async";
  label?: string;
  placeholder?: string;
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  error?: {
    message: string;
  };
  search?: boolean;
  debounceQuery?: boolean;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  onLoadMore?: () => void;
}

export const Autocomplete = ({
  id = "",
  required = false,
  type = "sync",
  label = "",
  placeholder = "",
  selected = null,
  disabled = false,
  items = [],
  error = {
    message: "No Result",
  },
  search = true,
  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
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
        <div
          className={clsx(
            "relative",
            "w-full",
            "cursor-default",
            "overflow-hidden",
            "rounded-[1rem]",
            "border border-[#B5B5B5]",
            "px-[1.5rem] py-[11.5px]",
            "h-[56px]",
            "grid grid-flow-col items-center content-center justify-between justify-items-start"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.125rem]",
              "w-full",
              "relative"
            )}
          >
            <input
              ref={inputRef}
              type={type}
              id={id}
              placeholder=" "
              className={clsx(
                "peer",
                "w-full",
                "bg-transparent",
                "font-Manrope font-normal text-[0.875rem] leading-[1.25rem]",
                "text-[#201E2C] disabled:text-[#666666]",
                "placeholder:text-[#666666] placeholder:text-[0.875rem]",
                "outline-none",
                "border-none",
                "appearance-none"
              )}
              value={query}
              disabled={disabled}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                setIsFocus(true);
                setIsOpen(true);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
              }}
            />
            <label
              htmlFor={id}
              className={clsx(
                "absolute",
                !!query
                  ? "top-[-16px] text-[0.75rem]"
                  : "left-0 top-0 text-[0.75rem]",
                "text-[#98989E]",
                "transition-all transform scale-100",
                "peer-focus:top-[-16px] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                inputRef.current?.focus();
                setIsOpen(true);
              }}
            >
              {label}
              {required && (
                <span className={clsx("text-[#FF0066]")}>{"*"}</span>
              )}
            </label>
          </div>
        </div>

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
                {error.message}
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
