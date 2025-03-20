import * as React from "react";
import clsx from "clsx";

export interface CarPriceItemProps {
  label?: string;
  price?: string;
}

export const CarPriceItem = ({ label = "", price = "" }: CarPriceItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]"
      )}
    >
      <p className={clsx("text-[#727272] text-[0.875rem] font-medium")}>
        {label}
      </p>
      <p className={clsx("text-[black] text-[1.5rem] font-bold")}>{price}</p>
    </div>
  );
};
