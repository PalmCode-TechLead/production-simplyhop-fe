import * as React from "react";
import clsx from "clsx";
import { ArchiveTripActionEnum, ArchiveTripContext } from "../../context";
import { BookCardArchiveTrip } from "../../components/book_card";
import { useGetBookingMy } from "../../react_query/hooks";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";

export const BookArchiveTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ArchiveTripContext);

  const { isFetching: isFetchingGetBookingMy } = useGetBookingMy();
  const isLoading = isFetchingGetBookingMy;

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

  if (!state.book.data.length) {
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
    if (state.book.list.is_end_reached) return;
    dispatch({
      type: ArchiveTripActionEnum.SetBookData,
      payload: {
        ...state.book,
        list: {
          ...state.book.list,
          page_number: state.book.list.page_number + 1,
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
      isEndReached={state.book.list.is_end_reached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.book.data.map((item, itemIndex) => (
          <BookCardArchiveTrip key={itemIndex} {...item} />
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};
