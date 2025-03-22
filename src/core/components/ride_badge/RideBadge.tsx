import * as React from "react";
import clsx from "clsx";

export interface RideBadgeProps {
  id?: string;
  variant?: "danger" | "success";
  label?: string;
}

export const RideBadge = ({
  id = "",
  variant = "success",
  label = "",
}: RideBadgeProps) => {
  return (
    <div
      key={id}
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "px-[0.25rem] py-[0.25rem]",
        "border",
        "rounded-[0.375rem]",
        variant === "success" ? "border-[#2F8C16]" : "border-[#C53D8A]",
        variant === "success" ? "bg-[#F0FFEC]" : "bg-[#FFECFB]"
      )}
    >
      <span
        className={clsx(
          variant === "success" ? "text-[#2F8C16]" : "text-[#C53D8A]",
          "text-[0.75rem] font-medium"
        )}
      >
        {label}
      </span>
    </div>
  );
};
