import * as React from "react";
import clsx from "clsx";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownProps {
  labelProps?: InputLabelProps;
  position?: "top" | "bottom";

  selected?: null | { id: string; name: string };
  items?: {
    id: string;
    name: string;
  }[];
  onChange?: (
    data: {
      id: string;
      value: number;
    }[]
  ) => void;
}

export const Dropdown = ({
  labelProps,
  selected = null,
  items = [],
  onChange = () => {},
}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div ref={ref} className={clsx("relative", "w-full")}>
      <InputContainer
        className={clsx(
          "cursor-pointer",
          "font-medium text-[0.875rem] leading-[1.25rem]",
          "text-[#000000] whitespace-nowrap",
          "w-full"
        )}
        onClick={handleClick}
      >
        <InputLabel
          {...labelProps}
          className={clsx(
            "cursor-pointer",
            "top-[25%] !left-[26px] translate-y-[-50%] text-[0.75rem]"
          )}
        />
      </InputContainer>
      {isOpen && (
        <div
          className={clsx(
            "absolute",
            "top-[-160px] right-0",
            "grid grid-cols-1 place-content-start place-items-start",
            "px-[1rem] py-[0.75rem]",
            "min-w-[255px]",
            "bg-[white]",
            "rounded-[0.625rem]"
          )}
          style={{
            boxShadow: "0px 0px 25px 0px #365F2B66",
          }}
        >
          <span className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
            {labelProps?.children}
          </span>

          {/* NOTES: option counter */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-between justify-items-start",
                  "w-full"
                )}
              >
                {/*  */}
              </div>
            ))}
          </div>

          {/* end options */}
        </div>
      )}
    </div>
  );
};
