import * as React from "react";
import clsx from "clsx";
import { ListVehiclesSupport } from "../fragments/list";

export const VehiclesSupportContainer = () => {
  return (
    <div className={clsx("w-full h-full", "pb-[3rem]", "relative")}>
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full",
          "px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-start place-items-start",
            "max-w-container w-full h-full"
          )}
        >
          <ListVehiclesSupport />
        </div>
      </div>
    </div>
  );
};
