"use client";
import * as React from "react";
import clsx from "clsx";
import { RideCardResultTrip } from "../../components/ride_card";
import { useGetRideSearch } from "../../react_query/hooks";
import { ResultTripContext } from "../../context";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";

export const RidesResultTrip = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(ResultTripContext);
  const { isFetching: isFetchingGetRideSearch } = useGetRideSearch();
  const isLoading = isFetchingGetRideSearch;

  if (isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListLoader message={dictionaries.list.loading.message} />
      </div>
    );
  }

  if (!state.rides.data.length) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListErrorItem message={dictionaries.list.empty_data.message} />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.rides.data.map((item, itemIndex) => (
          <RideCardResultTrip {...item} key={itemIndex} />
        ))}
      </div>
    </div>
  );
};
