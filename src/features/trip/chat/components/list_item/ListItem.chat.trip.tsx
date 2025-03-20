import * as React from "react";
import clsx from "clsx";
import Image from "next/image";

export interface ListItemChatTripProps {
  image_url?: string;
  name?: string;
  message?: string;
  date?: string;
  onClick?: () => void;
}

export const ListItemChatTrip = ({
  image_url = "",
  name = "",
  message = "",
  date = "",
  onClick = () => {},
}: ListItemChatTripProps) => {
  return (
    <button
      className={clsx(
        "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
        "w-full"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Image
          src={image_url}
          alt={name}
          width={40}
          height={40}
          className={clsx(
            "w-[2.5rem] h-[2.5rem]",
            "rounded-[50%]",
            "object-cover object-center"
          )}
        />
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-[#141414] font-semibold")}>
            {name}
          </p>
          <p
            className={clsx("text-[0.875rem] text-[#4F5665] font-normal")}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      </div>

      <span className={clsx("text-[0.625rem] text-[#4F5665] font-normal")}>
        {date}
      </span>
    </button>
  );
};
