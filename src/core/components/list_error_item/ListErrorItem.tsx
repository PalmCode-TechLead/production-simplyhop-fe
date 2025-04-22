import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface ListErrorItemProps {
  message?: string;
}

export const ListErrorItem = ({ message = "" }: ListErrorItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center"
      )}
    >
      <SVGIcon
        name="Car"
        className={clsx("w-[6rem] h-[6rem]", "text-[#5AC53D]")}
      />

      <p className={clsx("text-[1rem] text-[#5AC53D] font-normal")}>
        {message}
      </p>
    </div>
  );
};
