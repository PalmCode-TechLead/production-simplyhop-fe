import * as React from "react";
import clsx from "clsx";
import { MyListTripContext } from "../../context";
import { BookCardMyListTrip } from "../../components/book_card";
import { useGetBookingMy } from "../../react_query/hooks/useGetBookingMy.my_list.trip";

export const BookMyListTrip = () => {
  const { state } = React.useContext(MyListTripContext);

  useGetBookingMy();
  return (
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
  );
};
