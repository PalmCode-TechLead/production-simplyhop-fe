import * as React from "react";
import clsx from "clsx";
import { Checkbox, CheckboxProps } from "../checkbox";
import SVGIcon from "@/core/icons";

export interface FormPassengerDetailProps {
  position?: "top" | "bottom";
  passenger?: {
    items: {
      id: string;
      name: string;
      description: string;
      value: number;
    }[];
    onChange: (
      data: {
        id: string;
        value: number;
      }[]
    ) => void;
  };
  carSeat?: {
    input: CheckboxProps;
  };
}

export const FormPassengerDetail = ({
  passenger = { items: [], onChange: () => {} },
  carSeat = {
    input: {},
  },
}: FormPassengerDetailProps) => {
  const { label, ...carSeatInput } = carSeat.input;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      {/* NOTES: option counter */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {passenger?.items?.map((item, itemIndex) => (
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
                className={clsx("text-[#232323] text-[0.875rem] font-semibold")}
              >
                {item.name}
              </span>
              <span
                className={clsx("text-[#606060] text-[0.625rem] font-normal")}
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
                onClick={() => {
                  passenger.onChange(
                    passenger?.items?.map((childItem) => {
                      return {
                        id: childItem.id,
                        value:
                          childItem.id === item.id
                            ? childItem.value - 1
                            : childItem.value,
                      };
                    })
                  );
                }}
              >
                <SVGIcon
                  name="Minus"
                  className={clsx("w-[0.75rem] h-[0.75rem]", "text-[black]")}
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
                onClick={() => {
                  passenger.onChange(
                    passenger?.items?.map((childItem) => {
                      return {
                        id: childItem.id,
                        value:
                          childItem.id === item.id
                            ? childItem.value + 1
                            : childItem.value,
                      };
                    })
                  );
                }}
              >
                <SVGIcon
                  name="Plus"
                  className={clsx("w-[0.75rem] h-[0.75rem]", "text-[black]")}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* end options */}
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
        )}
      >
        <Checkbox {...carSeatInput} />
        <span className={clsx("text-[#2C2C2E] text-[0.75rem] font-normal")}>
          {label}
        </span>
      </div>
    </div>
  );
};
