import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface CarFacilityFilterCounterBadgeProps {
  icon?: SVGIconProps["name"];
  label?: string;
  count?: number;
  onClick?: () => void;
}

export const CarFacilityFilterCounterBadge = ({
  icon = "SlidersHorizontal",
  label = "",
  count = 0,
  onClick = () => {},
}: CarFacilityFilterCounterBadgeProps) => {
  return (
    <button
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
        "px-[0.5rem] py-[0.25rem]",
        "bg-[#FAFFF9]",
        "border border-[#33CC33]",
        "rounded-[1.25rem]",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <SVGIcon
        name={icon}
        className={clsx("w-[1.25rem] h-[1.25rem]", "text-[#33CC33]")}
      />
      <span className={clsx("text-[#33CC33] text-[0.875rem] font-medium")}>
        {label}
      </span>

      <div
        className={clsx(
          "flex items-center justify-center",
          "w-[1.25rem] h-[1.25rem]",
          "bg-[#33CC33]",
          "rounded-[50%]",
          "text-[white] text-[0.625rem] font-medium"
        )}
      >
        {count}
      </div>
    </button>
  );
};
