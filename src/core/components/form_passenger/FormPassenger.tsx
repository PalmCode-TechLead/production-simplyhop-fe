import * as React from "react";
import clsx from "clsx";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import { useOnClickOutside } from "usehooks-ts";
import {
  FormPassengerDetail,
  FormPassengerDetailProps,
} from "../form_passenger_detail/FormPassengerDetail";
import { BottomSheet } from "../bottom_sheet";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormWrapperPassengerDetail } from "../form_wrapper_passenger_detail";
import { Button } from "../button";
import SVGIcon from "@/core/icons";

export interface FormPassengerProps {
  labelProps?: InputLabelProps;
  position?: "top" | "bottom";

  maskedValue?: string;
  detail?: FormPassengerDetailProps;
}

export const FormPassenger = ({
  labelProps,
  maskedValue = "",
  detail,
}: FormPassengerProps) => {
  const { isLg } = useTailwindBreakpoint();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
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
        {maskedValue}
        <InputLabel
          {...labelProps}
          className={clsx(
            "cursor-pointer",
            "top-[25%] !left-[0.75rem] sm:!left-[26px] translate-y-[-50%] text-[0.75rem]"
          )}
        />
      </InputContainer>
      {isLg ? (
        <FormWrapperPassengerDetail isOpen={isOpen}>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <span className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
              {detail?.title}
            </span>
            <FormPassengerDetail {...detail} />
          </div>
        </FormWrapperPassengerDetail>
      ) : (
        <BottomSheet isOpen={isOpen}>
          <div
            className={clsx(
              "grid grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[1.5rem]",
              "w-full",
              "min-h-[375px]",
              "px-[1rem] py-[2rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                  "w-full"
                )}
              >
                <button onClick={handleCloseBottomSheet}>
                  <SVGIcon
                    name="X"
                    className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
                  />
                </button>
                <span
                  className={clsx("text-[#292929] text-[1.125rem] font-bold")}
                >
                  {detail?.title}
                </span>
              </div>

              <FormPassengerDetail {...detail} />
            </div>
            <Button>{"Spreichen Sie"}</Button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
