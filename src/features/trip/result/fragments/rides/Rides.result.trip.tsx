"use client";
import * as React from "react";
import clsx from "clsx";
import { RideCardResultTrip } from "../../components/ride_card";
import { useGetRideSearch } from "../../react_query/hooks";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const RidesResultTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const { isFetching: isFetchingGetRideSearch } = useGetRideSearch();
  const isLoading = isFetchingGetRideSearch;

  if (isLoading && state.rides.pagination.number === PAGINATION.NUMBER) {
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

  if (!state.rides.data.length && !isLoading) {
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

  const handleLoadMore = () => {
    if (isLoading) return;
    if (state.rides.pagination.is_end_reached) return;
    dispatch({
      type: ResultTripActionEnum.SetRidesData,
      payload: {
        ...state.rides,
        pagination: {
          ...state.rides.pagination,
          number: state.rides.pagination.number + 1,
        },
      },
    });
  };

  return (
    <InfiniteScrollWrapper
      loader={{
        message: dictionaries.list.loading.message,
      }}
      isPaused={isLoading}
      isEndReached={state.rides.pagination.is_end_reached}
      onLoadMore={handleLoadMore}
    >
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
    </InfiniteScrollWrapper>
  );
};
