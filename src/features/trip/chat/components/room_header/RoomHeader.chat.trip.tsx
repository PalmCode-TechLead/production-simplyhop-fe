import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export interface RoomHeaderChatTripProps {
  image?: ImageProps;
  name?: string;
}

export const RoomHeaderChatTrip = ({
  image,
  name = "",
}: RoomHeaderChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-items-start justify-start gap-[0.75rem]",
        "w-full",
        "px-[2.25rem] py-[0.75rem]",
        "border-b border-b-[#E9E9E9]"
      )}
    >
      <Image
        {...image}
        src={image?.src ?? ""}
        alt={image?.alt ?? ""}
        width={image?.width ?? 0}
        height={image?.height ?? 0}
        className={clsx(
          "w-[2.25rem] h-[2.25rem]",
          "rounded-[50%]",
          "object-center object-cover"
        )}
      />
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0rem]"
        )}
      >
        <h2 className={clsx("text-[#141414] text-[1rem] font-semibold")}>
          {name}
        </h2>
      </div>
    </div>
  );
};
