import * as React from "react";
import clsx from "clsx";
import { RideCardResultTrip } from "../../components/ride_card";
import { useGetRideSearch } from "../../react_query/hooks";

export const RidesResultTrip = () => {
  const data = Array.from({ length: 5 });
  useGetRideSearch();
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
        {data.map((item, itemIndex) => (
          <RideCardResultTrip key={itemIndex} />
        ))}
      </div>
    </div>
  );
};
