import * as React from "react";
import clsx from "clsx";

export interface CarPriceItemProps {
  label?: string | null;
  price?: string;
  className?: string;
}

export const CarPriceItem = ({
  label = null,
  price = "",
  className,
}: CarPriceItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        className
      )}
    >
      {!label && (
        <p
          className={clsx(
            "text-[#727272] text-[0.75rem] lg:text-[0.875rem] font-medium"
          )}
        >
          {label}
        </p>
      )}

      <p
        className={clsx("text-[black] text-[1rem] lg:text-[1.5rem] font-bold")}
      >
        {price}
      </p>
    </div>
  );
};
