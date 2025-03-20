import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { SVGIconProps } from "@/core/icons";
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
  CarFacilityItem,
  CarFacilityItemProps,
} from "@/core/components/car_facility_item";
import {
  CarPriceItem,
  CarPriceItemProps,
} from "@/core/components/car_price_item";
import {
  PriceOfferedItem,
  PriceOfferedItemProps,
} from "@/core/components/price_offered_item/PriceOfferedItem";
import {
  TripNoteItem,
  TripNoteItemProps,
} from "@/core/components/trip_note_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";

export interface CustomerOrderCardChatTripProps {
  time?: string;
  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
    facility?: {
      top: CarFacilityItemProps[];
      bottom: CarFacilityItemProps[];
    };
  };

  routes?: {
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
  price?: {
    initial?: CarPriceItemProps;
    offered?: PriceOfferedItemProps;
  };
  note?: TripNoteItemProps;
}

export const CustomerOrderCardChatTrip = ({
  time = "10:30 AM",
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
    facility: {
      top: [
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
      ],
      bottom: [
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
      ],
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
    offered: {
      label: "Angebotener Preis",
      price: "€25.00",
    },
  },
  note = {
    label: "Hinweis",
    note: "Lorem Ipsum",
  },
}: CustomerOrderCardChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start-content-start justify-center justify-items-center gap-[1.5rem]",
          "w-full"
        )}
      >
        <span className={clsx('text-[#A0A0A0] text-[0.75rem] font-normal')}>{time}</span>
      </div>

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
          <Image {...car.image} className={clsx("w-[145px]")} />

          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {/* identity */}
            <CarIdentityItem {...car.identity} />

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
                {car.facility?.top.map((item, index) => (
                  <CarFacilityItem
                    key={index}
                    icon={{ ...item.icon } as { name: SVGIconProps["name"] }}
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
                {car.facility?.bottom.map((item, Index) => (
                  <CarFacilityItem
                    key={Index}
                    icon={{ ...item.icon } as { name: SVGIconProps["name"] }}
                    name={{ ...item.name }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* price */}
          <CarPriceItem {...price.initial} />
        </div>

        {/* price offered */}
        <div
          className={clsx(
            "w-full",
            "px-[1rem] py-[0.75rem]",
            "border-t border-t-[#F8F8F8]"
          )}
        >
          <PriceOfferedItem {...price.offered} />
        </div>

        {/* trip note */}
        <div
          className={clsx(
            "w-full",
            "px-[1rem] py-[0.75rem]",
            "border-t border-t-[#F8F8F8]"
          )}
        >
          <TripNoteItem {...note} />
        </div>

        {/* action */}
      </div>
    </div>
  );
};
