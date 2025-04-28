import * as React from "react";
import clsx from "clsx";
import { ArchiveTripContext } from "../../context";
import { BookCardArchiveTrip } from "../../components/book_card";
import { useGetBookingMy } from "../../react_query/hooks";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";

export const BookArchiveTrip = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(ArchiveTripContext);

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

  return (
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
  );
};
