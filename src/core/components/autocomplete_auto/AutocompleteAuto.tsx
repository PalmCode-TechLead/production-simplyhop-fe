import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import SVGIcon from "../../icons";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";

export interface AutocompleteAutoProps {
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
}

export const AutocompleteAuto = ({
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
}: AutocompleteAutoProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    setQuery(selected?.name ?? "");

    setIsOpen(false);
  });

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
                  ? "top-[25%] left-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-0 translate-y-[-50%] text-[0.75rem]",
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
            {filteredItems.length === 0 ? (
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
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};
