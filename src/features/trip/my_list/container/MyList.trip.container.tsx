'use client'
import * as React from "react";
import clsx from "clsx";
import { HeaderMyListTrip } from "../fragments/header";
import { TabMyListTrip } from "../fragments/tab";
import { OrderCardMyListTrip } from "../components/order_card";
import { useGetRidesMy } from "../react_query/hooks";

export const MyListTripContainer = () => {
  const data = Array.from({ length: 5 });
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
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {data.map((_, itemIndex) => (
              <OrderCardMyListTrip key={itemIndex} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
