"use client";
import * as React from "react";
import clsx from "clsx";
import { HeaderMyListTrip } from "../fragments/header";
import { TabMyListTrip } from "../fragments/tab";
import { useGetRidesMy } from "../react_query/hooks";
import { useSearchParams } from "next/navigation";
import { BookMyListTrip } from "../fragments/book";
import { RideMyListTrip } from "../fragments/ride";

export const MyListTripContainer = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useGetRidesMy();
  return (
    <div className={clsx("w-full h-full", "py-[3rem]", "relative", "")}>
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full",
          "px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[2.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          <HeaderMyListTrip />
          <TabMyListTrip />
          {type === "book" ? <BookMyListTrip /> : <RideMyListTrip />}
        </div>
      </div>
    </div>
  );
};
