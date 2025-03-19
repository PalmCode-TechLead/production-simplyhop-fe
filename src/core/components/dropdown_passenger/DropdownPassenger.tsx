import * as React from "react";
import clsx from "clsx";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownPassengerProps {
  labelProps?: InputLabelProps;
  position?: "top" | "bottom";

  maskedValue?: string;
  items?: {
    id: string;
    name: string;
    description: string;
    value: number;
  }[];
  onChange?: (
    data: {
      id: string;
      value: number;
    }[]
  ) => void;
}

export const DropdownPassenger = ({
  labelProps,

  maskedValue = "",
  items = [],
  onChange = () => {},
}: DropdownPassengerProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={clsx("relative", "w-full")}>
      <InputContainer
        ref={ref}
        className={clsx(
          "cursor-pointer",
          "font-medium text-[0.875rem] leading-[1.25rem]",
          "text-[#000000] whitespace-nowrap",
          "w-full"
        )}
        onClick={handleClick}
      >
        {maskedValue}
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
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start gap-[0.125rem]",
                    "w-full"
                  )}
                >
                  <span
                    className={clsx(
                      "text-[#232323] text-[0.875rem] font-semibold"
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={clsx(
                      "text-[#606060] text-[0.625rem] font-normal"
                    )}
                  >
                    {item.description}
                  </span>
                </div>

                <div
                  className={clsx(
                    "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[0.5rem]"
                  )}
                >
                  <button
                    className={clsx(
                      "flex items-center justify-center",
                      "bg-[#F5F5F5]",
                      "rounded-[50%]",
                      "disabled:opacity-50"
                    )}
                    disabled={item.value === 0}
                    onClick={() =>
                      onChange(
                        items.map((childItem) => {
                          return {
                            id: childItem.id,
                            value:
                              childItem.id === item.id
                                ? childItem.value - 1
                                : childItem.value,
                          };
                        })
                      )
                    }
                  >
                    <SVGIcon
                      name="Minus"
                      className={clsx(
                        "w-[0.75rem] h-[0.75rem]",
                        "text-[black]"
                      )}
                    />
                  </button>

                  <span className={clsx("text-[black] text-[1rem] font-bold")}>
                    {item.value}
                  </span>

                  <button
                    className={clsx(
                      "flex items-center justify-center",
                      "bg-[#F5F5F5]",
                      "rounded-[50%]",
                      "disabled:opacity-50"
                    )}
                    onClick={() =>
                      onChange(
                        items.map((childItem) => {
                          return {
                            id: childItem.id,
                            value:
                              childItem.id === item.id
                                ? childItem.value + 1
                                : childItem.value,
                          };
                        })
                      )
                    }
                  >
                    <SVGIcon
                      name="Plus"
                      className={clsx(
                        "w-[0.75rem] h-[0.75rem]",
                        "text-[black]"
                      )}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* end options */}
        </div>
      )}
    </div>
  );
};
