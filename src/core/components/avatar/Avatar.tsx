import Image from "next/image";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export const Avatar = ({
  src,
  alt = "User avatar",
  className,
}: AvatarProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-[50%]",
        "bg-[#5AC53D]",
        "overflow-clip",
        "relative",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 10240px) 48px, (min-width: 1024px) 64px, 80px"
          className={clsx("object-cover", "w-full h-full")}
        />
      ) : (
        <SVGIcon
          name={"User"}
          className={clsx("w-2/3 h-2/3", "text-[white]")}
        />
      )}
    </div>
  );
};
