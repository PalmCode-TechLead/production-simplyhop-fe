import * as React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import clsx from "clsx";
import "./page_loader.css";

export const PageLoader = () => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 bottom-0 right-0",
        "grid grid-rows-1 place-content-center place-items-center",
        "w-full h-[100vh]",
        "z-[9999]"
      )}
    >
      <div className="horizontal-loader">
        <PulseLoader size={16} color={"#5AC53D"} />
      </div>
    </div>
  );
};
