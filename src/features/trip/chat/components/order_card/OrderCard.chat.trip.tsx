import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import SVGIcon from "@/core/icons";
import { TravelTimeItem } from "@/core/components/travel_time_item";
import { DepartureItem } from "@/core/components/departure_item";
import { ArrivalItem } from "@/core/components/arrival_item";
import { CarFacilityItem } from "@/core/components/car_facility_item";
import { CarPriceItem } from "@/core/components/car_price_item";
import { PriceOfferedItem } from "@/core/components/price_offered_item/PriceOfferedItem";
import { TripNoteItem } from "@/core/components/trip_note_item";

export interface IOrderCardChatTripProps {}

export const OrderCardChatTrip = (props: IOrderCardChatTripProps) => {
  const top = [
    {
      id: "people",
      icon: {
        name: "User",
        className: "text-[#D41010]",
      },
      name: {
        label: "Letzter Platz für deine Buchung",
        color: "#D41010",
      },
    },
    {
      id: "briefcase",
      icon: {
        name: "Briefcase",
        className: "text-[#D41010]",
      },
      name: {
        label: "Kein Gepäck erlaubt",
        color: "#D41010",
      },
    },
  ];

  const bottom = [
    {
      id: "cigarette-off",
      icon: {
        name: "CigaretteOff",
        className: "text-[#727272]",
      },
      name: {
        label: "Nichtraucher",
        color: "#727272",
      },
    },
    {
      id: "music",
      icon: {
        name: "Music",
        className: "text-[#727272]",
      },
      name: {
        label: "Musik erlaubt",
        color: "#727272",
      },
    },
    {
      id: "dog",
      icon: {
        name: "Dog",
        className: "text-[#727272]",
      },
      name: {
        label: "Haustiere erlaubt",
        color: "#727272",
      },
    },
  ];
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "border border-[#EFEFEF]"
      )}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] items-start content-start justify-start justify-items-start gap-[52px]",
          "w-full"
        )}
      >
        <Image
          src={"/images/general/car.png"}
          alt="car"
          width={145}
          height={46}
          className={clsx("w-[145px]")}
        />

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* name */}
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <SVGIcon
              name="Car"
              className={clsx("w-[1rem] h-[1rem]", "text-[black]")}
            />
            <p className={clsx("text-[black] text-[1rem] font-medium")}>
              {"Toyota Rav 4"}
            </p>
          </div>
          {/* routes */}

          <div
            className={clsx(
              "grid grid-cols-[auto_80px_auto] place-content-start place-items-start gap-[2.25rem]",
              "w-full"
            )}
          >
            <DepartureItem place={"Munich"} time={"17.30 Uhr"} />

            <TravelTimeItem time={"1h 15m"} />

            <ArrivalItem place={"Berlin"} time={"18.30 Uhr"} />
          </div>

          {/* facility */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.75rem]",
                "w-full"
              )}
            >
              {top.map((item, index) => (
                <CarFacilityItem
                  key={index}
                  icon={{ ...item.icon }}
                  name={{ ...item.name }}
                />
              ))}
            </div>

            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.75rem]",
                "w-full"
              )}
            >
              {bottom.map((item, Index) => (
                <CarFacilityItem
                  key={Index}
                  icon={{ ...item.icon }}
                  name={{ ...item.name }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* price */}
        <CarPriceItem label={"Angebotspreis"} price={"€25.00"} />
      </div>

      {/* price offered */}
      <div
        className={clsx(
          "w-full",
          "px-[1rem] py-[0.75rem]",
          "border-t border-t-[#F8F8F8]"
        )}
      >
        <PriceOfferedItem label={"Angebotener Preis"} price={"€20.00"} />
      </div>

      {/* trip note */}
      <div
        className={clsx(
          "w-full",
          "px-[1rem] py-[0.75rem]",
          "border-t border-t-[#F8F8F8]"
        )}
      >
        <TripNoteItem label={"Hinweis"} note={"Lorem Ipsum"} />
      </div>

      {/* action */}
    </div>
  );
};
