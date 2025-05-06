import * as React from "react";
import clsx from "clsx";
import { ArchiveTripActionEnum, ArchiveTripContext } from "../../context";
import { RideCardArchiveTrip } from "../../components/ride_card";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { useGetRidesSearch } from "../../react_query/hooks";
import { ListErrorItem } from "@/core/components/list_error_item";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const RideArchiveTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ArchiveTripContext);
  const { isFetching: isFetchingGetRidesMy } = useGetRidesSearch();

  const isLoading = isFetchingGetRidesMy;

  if (isLoading && state.ride.pagination.current === PAGINATION.NUMBER) {
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

  const handleLoadMore = () => {
    if (isLoading) return;

    dispatch({
      type: ArchiveTripActionEnum.SetRideDataPaginationCurrent,
      payload: state.ride.pagination.current + 1,
    });
  };

  const isEndReached =
    state.ride.pagination.last === state.ride.pagination.current;

  return (
    <InfiniteScrollWrapper
      loader={<ListLoader message={dictionaries.list.loading.message} />}
      isPaused={isLoading}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.ride.data.map((item, itemIndex) => (
          <RideCardArchiveTrip key={itemIndex} {...item} />
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};
