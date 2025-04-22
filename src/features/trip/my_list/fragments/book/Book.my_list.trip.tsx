import * as React from "react";
import clsx from "clsx";
import { MyListTripContext } from "../../context";
import { BookCardMyListTrip } from "../../components/book_card";

export const BookMyListTrip = () => {
  const { state, dispatch } = React.useContext(MyListTripContext);
  const data = Array.from({ length: 5 });
  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      {data.map((_, itemIndex) => (
        <BookCardMyListTrip key={itemIndex} />
      ))}
    </div>
  );
};
