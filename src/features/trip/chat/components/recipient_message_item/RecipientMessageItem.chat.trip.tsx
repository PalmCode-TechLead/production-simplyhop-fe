import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export interface RecipientMessageItemChatTripProps {
  id?: string;
  time?: string;
  name?: string;
  image?: ImageProps;
  message?: string;
}

export default function RecipientMessageItemChatTrip({
  id = "",
  time = "",
  name = "",
  image = {
    src: "",
    width: 36,
    height: 36,
    alt: "sender",
  },
  message = "",
}: RecipientMessageItemChatTripProps) {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-start justify-items-start gap-[1rem]"
        )}
      >
        <Image
          {...image}
          alt={image.alt}
          className={clsx(
            "w-[2.25rem] h-[2.25rem]",
            "rounded-[50%]",
            "object-cover object-center"
          )}
        />
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.75rem]"
            )}
          >
            <span className={clsx("text-[#515151] text-[0.75rem] font-medium")}>
              {name}
            </span>
            <span className={clsx("text-[#A0A0A0] text-[0.75rem] font-normal")}>
              {time}
            </span>
          </div>

          <div
            className={clsx(
              "bg-[white]",
              "border border-[#E7E7E7]",
              "rounded-tr-[0.875rem] rounded-br-[0.875rem] rounded-bl-[0.875rem]",
              "px-[1.5rem] py-[1rem]",
              "max-w-[500px]",
              "text-[#515151] text-[1rem] font-normal"
            )}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
