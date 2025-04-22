import * as React from "react";
import clsx from "clsx";
import { MyListTripContext } from "../../context";
import { RideCardMyListTrip } from "../../components/ride_card";

export const RideMyListTrip = () => {
  const { state } = React.useContext(MyListTripContext);

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
