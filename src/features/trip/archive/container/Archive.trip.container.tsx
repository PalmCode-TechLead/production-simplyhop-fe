"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderArchiveTrip } from "../fragments/header";
import { TabArchiveTrip } from "../fragments/tab";
import { useSearchParams } from "next/navigation";
import { BookArchiveTrip } from "../fragments/book";
import { RideArchiveTrip } from "../fragments/ride";
import { UserContext } from "@/core/modules/app/context";
import { RideDetailArchiveTrip } from "../fragments/ride_detail";
import { BookDetailArchiveTrip } from "../fragments/book_detail";

export const ArchiveTripContainer = () => {
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      <div className={clsx("w-full h-full", "pb-[3rem]", "relative")}>
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full h-full",
            "px-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start",
              "max-w-container w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[2.5rem]",
                "w-full h-full",
                "sticky top-[90px] z-[10]",
                "bg-[white]",
                "pt-[3rem] pb-[2.5rem]"
              )}
            >
              <HeaderArchiveTrip />
              <React.Suspense fallback={<div />}>
                <TabArchiveTrip />
              </React.Suspense>
            </div>

            {type === "book" ? (
              <BookArchiveTrip />
            ) : !type && userState.profile?.is_driver === false ? (
              <BookArchiveTrip />
            ) : (
              <RideArchiveTrip />
            )}
          </div>
        </div>
      </div>
      <RideDetailArchiveTrip />

      <BookDetailArchiveTrip />
    </>
  );
};
