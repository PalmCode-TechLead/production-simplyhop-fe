import * as React from "react";
import clsx from "clsx";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { BookCardMyListTrip } from "../../components/book_card";
import { useGetBookingMy } from "../../react_query/hooks";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const BookMyListTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(MyListTripContext);

  const { isFetching: isFetchingGetBookingMy } = useGetBookingMy();
  const isLoading = isFetchingGetBookingMy;

  if (isLoading && state.book.pagination.number === PAGINATION.NUMBER) {
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

  if (!state.book.data.length && !isLoading) {
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
    if (state.ride.pagination.is_end_reached) return;
    dispatch({
      type: MyListTripActionEnum.SetBookData,
      payload: {
        ...state.book,
        pagination: {
          ...state.book.pagination,
          number: state.book.pagination.number + 1,
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
      isEndReached={state.book.pagination.is_end_reached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.book.data.map((item, itemIndex) => (
          <BookCardMyListTrip key={itemIndex} {...item} />
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};
