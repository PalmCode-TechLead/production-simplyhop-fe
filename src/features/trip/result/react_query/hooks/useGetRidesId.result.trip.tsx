import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import {
  GetRidesIdErrorResponseInterface,
  GetRidesIdPayloadRequestInterface,
  GetRidesIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchGetRidesId } from "@/core/services/rest/simplyhop/rides";
import { usePathname, useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";

export const useGetRidesId = () => {
  const globalDictionaries = getGlobalDictionaries();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);
  const { state, dispatch } = React.useContext(ResultTripContext);

  const payload: GetRidesIdPayloadRequestInterface = {
    path: {
      id: Number(String(rideId ?? "0")),
    },
    params: {
      include: "vehicle.brand,rideTimes,user,bookings,bookings.user",
    },
  };
  const query = useQuery<
    GetRidesIdSuccessResponseInterface,
    GetRidesIdErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.GetRidesId(),
    queryFn: () => {
      return fetchGetRidesId(payload);
    },
    enabled: !!rideId,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const item = query.data.data;
      const totalPassenger = state.filters.passenger.value.reduce(
        (acc, item) => {
          return acc + item.value;
        },
        0
      );
      const fullPath = `${pathname}?${searchParams.toString()}`;
      dispatch({
        type: ResultTripActionEnum.SetDetailData,
        payload: {
          ...state.detail,
          data: {
            id: String(item.id),
            driver: {
              profile: {
                id: String(item.user.id),
                avatar: !item.user.avatar
                  ? undefined
                  : {
                      src: item.user.avatar,
                      alt: "photo_profile",
                    },
                name: `${item.user.first_name} ${item.user.last_name}`,
              },
            },
            car: {
              image: {
                src: !item.vehicle.image.length
                  ? "/images/general/car.png"
                  : item.vehicle.image[0] ?? "/images/general/car.png",
                alt: "car",
                width: 145,
                height: 46,
              },
              identity: {
                name: `${item.vehicle.brand?.title} ${item.vehicle.model}`,
                number: item.vehicle.plate_license,
              },
              facility: {
                top: [
                  ...(!!item.available_seats
                    ? [
                        {
                          ...globalDictionaries.vehicle.seat.available,
                          icon: {
                            ...globalDictionaries.vehicle.seat.available.icon,
                            name: globalDictionaries.vehicle.seat.available.icon
                              .name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.seat.available.name,
                            label:
                              globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                "{{number}}",
                                item.available_seats.toLocaleString("de-DE")
                              ),
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.seat.empty,
                          icon: {
                            ...globalDictionaries.vehicle.seat.empty.icon,
                            name: globalDictionaries.vehicle.seat.empty.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]),
                  ...(!!item.vehicle.numb_of_luggages
                    ? [
                        {
                          ...globalDictionaries.vehicle.luggage.available,
                          icon: {
                            ...globalDictionaries.vehicle.luggage.available
                              .icon,
                            name: globalDictionaries.vehicle.luggage.available
                              .icon.name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.luggage.available
                              .name,
                            label:
                              globalDictionaries.vehicle.luggage.available.name
                                .label,
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.luggage.empty,
                          icon: {
                            ...globalDictionaries.vehicle.luggage.empty.icon,
                            name: globalDictionaries.vehicle.luggage.empty.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]),
                ],
                bottom: [
                  // Smoking
                  ...(!!item.vehicle.smoke_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.smoking.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.allowed.icon,
                            name: globalDictionaries.vehicle.smoking.allowed
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.smoking.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.prohibited
                              .icon,
                            name: globalDictionaries.vehicle.smoking.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Music
                  ...(!!item.vehicle.music_availability
                    ? [
                        {
                          ...globalDictionaries.vehicle.music.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.music.allowed.icon,
                            name: globalDictionaries.vehicle.music.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.music.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.music.prohibited.icon,
                            name: globalDictionaries.vehicle.music.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Pet
                  ...(!!item.vehicle.pet_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.pets.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.pets.allowed.icon,
                            name: globalDictionaries.vehicle.pets.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.pets.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.pets.prohibited.icon,
                            name: globalDictionaries.vehicle.pets.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),
                ],
              },
            },

            routes: {
              departure: {
                place: !item.start_name ? "-" : item.start_name,
                time: !item.departure_time
                  ? "-"
                  : dayjs(item.departure_time).format("HH.mm [Uhr]"),
              },
              travelTime: {
                time: !item.eta ? "-" : setDurationTime(item.eta),
                waitingTime: !item.waiting_time ? "" : item.waiting_time,
              },
              arrival: {
                place: !item.destination_name ? "-" : item.destination_name,
                time:
                  !item.eta || !item.departure_time
                    ? "-"
                    : `${setArrivalTime(
                        dayjs(item.departure_time).format("HH:mm"),
                        item.eta
                      )} Uhr`,
              },
            },

            price: {
              initial: {
                label: "Angebotspreis",
                price: `€${item.base_price * totalPassenger}`,
              },
            },
            ride: {
              badge: [
                // ...(index === 0
                //   ? [
                //       {
                //         id: "bester_preis",
                //         label: "Bester Preis",
                //         variant: "success" as "success" | "danger",
                //       },
                //     ]
                //   : []),
                ...(item.user.gender === "female"
                  ? [
                      {
                        id: "fahrerin",
                        label: "Fahrerin (W)",
                        variant: "danger" as "success" | "danger",
                      },
                    ]
                  : []),
                ...(item.maxtwo_backseat
                  ? [
                      {
                        id: "max_two_backseat",
                        label: "Max. 2 auf der Rückbank",
                        variant: "danger" as "danger" | "success",
                      },
                    ]
                  : []),
              ],
            },
            cta: {
              ride: {
                href: `${fullPath}&${RIDE_FILTER.RIDE_ID}=${item.id}`,
                children: "Mitfahren",
              },
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
