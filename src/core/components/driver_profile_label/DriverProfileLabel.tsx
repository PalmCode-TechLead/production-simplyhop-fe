import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "../avatar";
import SVGIcon from "@/core/icons";

export interface DriverProfileLabelProps {
  avatar?: AvatarProps;
  name?: string;
}

export const DriverProfileLabel = ({
  avatar,
  name = "",
}: DriverProfileLabelProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1.5rem]"
      )}
    >
      <Avatar {...avatar} className={clsx("w-[2rem] h-[2rem]")} />
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.625rem]"
        )}
      >
        <SVGIcon
          name="User"
          className={clsx("w-[1rem] h-[1rem]", "text-[black]")}
        />
        <p className={clsx("text-[1rem] text-[black] font-medium")}>{name}</p>
      </div>
    </div>
  );
};
