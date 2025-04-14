import { useState, useRef } from "react";
import clsx from "clsx";

import { useOnClickOutside } from "usehooks-ts";
import SVGIcon from "../../icons";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";

export interface DropdownfieldProps {
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
}

export const Dropdownfield = ({
  selected = null,
  disabled = false,
  items = [],
  onSelect = () => {},
  // NOTES: async purpose
  inputProps,
  labelProps,
}: DropdownfieldProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    setIsOpen(false);
  });

  const handleChange = (data: { id: string; name: string }) => {
    onSelect(data);

    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
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
              readOnly
              placeholder={selected?.name}
              className={clsx("pr-[1.5rem]", "!cursor-pointer")}
              onFocus={() => {
                setIsOpen(true);
                if (disabled) {
                  return;
                }
              }}
              onChange={(event) => {
                setIsOpen(!!event.target.value.length);
              }}
            />

            <div
              className={clsx(
                "flex items-center justify-center",
                "w-[1rem] h-[1rem]",
                "absolute",
                !!selected?.name
                  ? "top-[75%] right-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] right-0 translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[75%]"
              )}
            >
              <SVGIcon
                name={isOpen ? "ChevronUp" : "ChevronDown"}
                className={clsx("w-[1rem] h-[1rem]", "text-[#767676]")}
              />
            </div>

            <InputLabel
              {...labelProps}
              className={clsx(
                !!selected?.name
                  ? "top-[25%] left-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-0 translate-y-[-50%] text-[0.875rem]",
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
            {items.map((item, index) => (
              <AutocompleteOption
                key={index}
                className={clsx(
                  selected?.id === item.id
                    ? "font-bold text-[#5AC53D]"
                    : "font-normal text-[#201E2C]"
                )}
                onClick={() => handleChange(item)}
              >
                {item.name}
              </AutocompleteOption>
            ))}
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};
