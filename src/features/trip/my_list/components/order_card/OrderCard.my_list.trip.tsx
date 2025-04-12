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
import {
  TravelDateItem,
  TravelDateItemProps,
} from "@/core/components/travel_date_item";
import {
  TravelStartTimeItem,
  TravelStartTimeItemProps,
} from "@/core/components/travel_start_time_item";
import { Button } from "@/core/components/button";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label";

export interface OrderCardMyListTripProps {
  driver?: {
    profile: DriverProfileLabelProps;
  };
  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
  };

  routes?: {
    date?: TravelDateItemProps;
    startTime?: TravelStartTimeItemProps;
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
  driver = {
    profile: {
      avatar: {
        image: undefined,
      },
      name: "Kelly",
    },
  },
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
    date: {
      label: "Datum",
      date: "24.02.25",
    },
    startTime: {
      label: "Startzeit",
      time: "17:30 Uhr",
    },
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
          "grid grid-flow-row grid-cols-1 lg:grid-cols-none place-content-start place-items-start lg:grid-flow-col lg:items-start lg:content-start lg:justify-between lg:justify-items-start gap-[1.5rem] lg:gap-[52px]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* driver */}
          <DriverProfileLabel {...driver.profile} />
        </div>

        {/* image */}
        <Image
          {...car.image}
          alt={car.image.alt}
          className={clsx("w-[145px]")}
        />

        {/* identity */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <CarIdentityItem {...car.identity} />
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

        {/* price */}
        <CarPriceItem {...price.initial} />

        {/* cta */}

        <Button
          className={clsx("!px-[0.5rem] !py-[0.5rem]")}
          onClick={cta.detail.onClick}
        >
          {cta.detail.children}
        </Button>
      </div>

      {/* action */}
    </div>
  );
};
