import * as React from "react";
import clsx from "clsx";

export interface DividerProps {
  type?: "horizontal" | "vertical";
}

export const Divider = ({ type = "horizontal" }: DividerProps) => {
  if (type === "vertical") {
    return <div className={clsx("w-[1px] h-full", "bg-[#F1F3F5]")} />;
  }
  return <div className={clsx("w-full h-[1px]", "bg-[#F1F3F5]")} />;
};
