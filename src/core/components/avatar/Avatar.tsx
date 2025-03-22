import Image, { ImageProps } from "next/image";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface AvatarProps {
  image?: ImageProps;
  icon?: {
    size: number;
  };
}

export const Avatar = ({ image }: AvatarProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-[50%]",
        "bg-[#5AC53D]",
        "w-[2rem] h-[2rem]"
      )}
    >
      {image ? (
        <Image {...image} />
      ) : (
        <SVGIcon
          name="User"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[white]")}
        />
      )}
    </div>
  );
};
