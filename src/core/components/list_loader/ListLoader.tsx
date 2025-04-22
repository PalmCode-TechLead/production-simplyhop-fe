import * as React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import clsx from "clsx";
import "./list_loader.css";
import SVGIcon from "@/core/icons";

export interface ListLoaderProps {
  message?: string;
}

export const ListLoader = ({ message = "" }: ListLoaderProps) => {
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
      <div className="horizontal-loader">
        <PulseLoader size={16} color={"#5AC53D"} />
      </div>

      <p className={clsx("text-[1rem] text-[#5AC53D] font-normal")}>
        {message}
      </p>
    </div>
  );
};
