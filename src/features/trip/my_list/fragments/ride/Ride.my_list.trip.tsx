import * as React from "react";
import clsx from "clsx";
import { MyListTripContext } from "../../context";
import { RideCardMyListTrip } from "../../components/ride_card";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { useGetRidesSearch } from "../../react_query/hooks";
import { ListErrorItem } from "@/core/components/list_error_item";

export const RideMyListTrip = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(MyListTripContext);
  const { isFetching: isFetchingGetRidesMy } = useGetRidesSearch();

  const isLoading = isFetchingGetRidesMy;

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

  if (!state.ride.data.length) {
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
        "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      {state.ride.data.map((item, itemIndex) => (
        <RideCardMyListTrip key={itemIndex} {...item} />
      ))}
    </div>
  );
};
