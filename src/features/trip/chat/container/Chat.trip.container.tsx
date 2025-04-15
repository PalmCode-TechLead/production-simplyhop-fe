"use client";
import * as React from "react";
import clsx from "clsx";
import { ListChatTrip } from "../fragments/list";
import { RoomChatTrip } from "../fragments/room";
import { PageSheet } from "@/core/components/page_sheet";
import { useSearchParams } from "next/navigation";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const ChatTripContainer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isLg } = useTailwindBreakpoint();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-1 place-content-start place-items-start",
        "w-full h-[calc(100vh-90px)]",
        "pt-[1.5rem] pb-[0.75rem] px-[1rem]",
        "relative"
      )}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 lg:grid-cols-[420px_auto_1fr] place-content-start place-items-start gap-[2.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          {/* NOTES: List */}
          <ListChatTrip />
          {/* NOTES: divider */}
          <div className={clsx("w-[1px] h-full", "bg-[#E9E9E9]")} />
          {/* NOTES: Room */}

          <div className={clsx("block lg:hidden", "w-full")}>
            <PageSheet isOpen={!!id && !isLg} direction={"right"}>
              <RoomChatTrip />
            </PageSheet>
          </div>
          <div className={clsx("hidden lg:block", "w-full")}>
            <RoomChatTrip />
          </div>
        </div>
      </div>
    </div>
  );
};
