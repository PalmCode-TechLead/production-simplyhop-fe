import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { RideCardResultTrip } from "../../components/ride_card";

export const RidesResultTrip = () => {
  const dictionaries = getDictionaries();
  const data = Array.from({ length: 5 });
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.75rem]",
        "w-full"
      )}
    >
      <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.ride.title}
      </h2>
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
