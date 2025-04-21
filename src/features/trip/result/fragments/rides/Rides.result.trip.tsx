import * as React from "react";
import clsx from "clsx";
import { RideCardResultTrip } from "../../components/ride_card";
import { useGetRideSearch } from "../../react_query/hooks";
import { ResultTripContext } from "../../context";

export const RidesResultTrip = () => {
  const { state } = React.useContext(ResultTripContext);
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
        {state.rides.data.map((item, itemIndex) => (
          <RideCardResultTrip {...item} key={itemIndex} />
        ))}
      </div>
    </div>
  );
};
