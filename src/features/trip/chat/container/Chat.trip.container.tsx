import * as React from "react";
import clsx from "clsx";
import { ListChatTrip } from "../fragments/list";
import { RoomChatTrip } from "../fragments/room";

export const ChatTripContainer = () => {
  console.log("ini kepanggil ga");
  return (
    <div className={clsx("w-full h-full", "relative")}>
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-[420px_auto_1fr] place-content-start place-items-start gap-[2.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          {/* NOTES: List */}
          <ListChatTrip />
          {/* NOTES: divider */}
          <div className={clsx("w-[1px] h-full", "bg-[#E9E9E9]")} />
          {/* NOTES: Room */}
          <RoomChatTrip />
        </div>
      </div>
    </div>
  );
};
