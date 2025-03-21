"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import {
  TravelTimeItem,
  TravelTimeItemProps,
} from "@/core/components/travel_time_item";
import {
  DepartureItem,
  DepartureItemProps,
} from "@/core/components/departure_item";
import { ArrivalItem, ArrivalItemProps } from "@/core/components/arrival_item";
import {
  CarPriceItem,
  CarPriceItemProps,
} from "@/core/components/car_price_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";

export interface OrderCardMyListTripProps {
  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
  };

  routes?: {
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
  price?: {
    initial?: CarPriceItemProps;
  };
  cta?: {
    detail: {
      children: React.ReactNode;
      onClick: () => void;
    };
  };
}

export const OrderCardMyListTrip = ({
  car = {
    image: {
      src: "/images/general/car.png",
      alt: "car",
      width: 145,
      height: 46,
    },
    identity: {
      name: "Toyota Rav 4",
      number: "WOB ZK 295",
    },
  },

  routes = {
    departure: {
      place: "Munich",
      time: "17.30 Uhr",
    },
    travelTime: {
      time: "1h 15m",
    },
    arrival: {
      place: "Berlin",
      time: "18.30 Uhr",
    },
  },

  price = {
    initial: {
      label: "Angebotspreis",
      price: "€25.00",
    },
  },
  cta = {
    detail: {
      children: "Siehe Details",
      onClick: () => {},
    },
  },
}: OrderCardMyListTripProps) => {
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
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[52px]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* routes */}
          <div
            className={clsx(
              "grid grid-cols-[auto_80px_auto] place-content-start place-items-start gap-[2.25rem]",
              "w-full"
            )}
          >
            <DepartureItem {...routes.departure} />

            <TravelTimeItem {...routes.travelTime} />

            <ArrivalItem {...routes.arrival} />
          </div>
        </div>

        {/* image */}
        <Image {...car.image} className={clsx("w-[145px]")} />

        {/* identity */}
        <CarIdentityItem {...car.identity} />

        {/* price */}
        <CarPriceItem {...price.initial} />

        {/* button */}
        <button
          className={clsx(
            "flex items-center justify-center",
            "bg-[#5AC53D]",
            "border border-[#5AC53D]",
            "px-[1rem] py-[0.75rem]",
            "rounded-[0.375rem]",
            "text-[white] text-[0.875rem] font-medium"
          )}
          onClick={cta.detail.onClick}
        >
          {cta.detail.children}
        </button>
      </div>

      {/* action */}
    </div>
  );
};
