import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "@/core/components/avatar";

export interface ListItemChatTripProps {
  id?: string;
  avatar?: AvatarProps;
  name?: string;
  message?: string;
  date?: string;
}

export const ListItemChatTrip = ({
  id = "",
  avatar,
  name = "",
  message = "",
  date = "",
}: ListItemChatTripProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Avatar {...avatar} className={clsx("w-[2.5rem] h-[2.5rem]")} />

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
            className={clsx(
              "text-[0.875rem] text-[#4F5665] font-normal text-left",
              "line-clamp-1 text-ellipsis",
              "w-full"
            )}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      </div>

      <span className={clsx("text-[0.625rem] text-[#4F5665] font-normal")}>
        {date}
      </span>
    </div>
  );
};
