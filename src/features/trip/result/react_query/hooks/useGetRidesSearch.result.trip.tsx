import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import { ResultTripActionEnum, ResultTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchSuccessResponseInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import dayjs from "dayjs";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { usePathname, useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";

export const useGetRideSearch = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);

  const fullPath = `${pathname}?${searchParams.toString()}`;
  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      // start_lat: state.filters.origin.selected.lat_lng?.lat ?? 0,
      // start_long: state.filters.origin.selected.lat_lng?.lng ?? 0,
      // destination_lat: state.filters.destination.selected.lat_lng?.lat ?? 0,
      // destination_long: state.filters.destination.selected.lat_lng?.lng ?? 0,
      // include: "rideTimes,vehicle,user,vehicle.brand,vehicle.category",
      // sort:"-base_price",
      start_lat: 52.5200066,
      start_long: 13.414954,
      destination_lat: 48.1351253,
      destination_long: 11.5819804,
      include: "rideTimes,vehicle,user,vehicle.brand,vehicle.category",
      sort: "-base_price",
      "filter[rideTimes.available_seats]": String(
        Number(String(adult ?? "0")) + Number(String(children ?? "0"))
      ),
      "filter[numb_of_luggages]": !state.advanced_filter.luggage.selected.length
        ? undefined
        : state.advanced_filter.luggage.selected
            .map((item) => item.id)
            .toString(),
      "filter[music_availability]": !state.advanced_filter.music.selected.length
        ? undefined
        : state.advanced_filter.music.selected.length === 1
        ? Boolean(state.advanced_filter.music.selected[0].id ?? "false")
        : undefined,
      "filter[smoke_allowed]": !state.advanced_filter.smoker.selected.length
        ? undefined
        : state.advanced_filter.smoker.selected.length === 1
        ? Boolean(state.advanced_filter.smoker.selected[0].id ?? "false")
        : undefined,
      "filter[pet_allowed]": !state.advanced_filter.pets.selected.length
        ? undefined
        : state.advanced_filter.pets.selected.length === 1
        ? Boolean(state.advanced_filter.pets.selected[0].id ?? "false")
        : undefined,
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.GetRidesSearch(payload),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
    enabled:
      !!state.filters.origin.selected.lat_lng &&
      !!state.filters.destination.selected.lat_lng,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const totalPassenger = state.filters.passenger.value.reduce(
        (acc, item) => {
          return acc + item.value;
        },
        0
      );

      dispatch({
        type: ResultTripActionEnum.SetRidesData,
        payload: {
          ...state.rides,
          data: data.data.map((item, index) => {
            return {
              id: String(item.id),
              driver: {
                profile: {
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
                    ...(!!item.vehicle.numb_free_seats
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.available,
                            icon: {
                              ...globalDictionaries.car.facility.seat.available
                                .icon,
                              name: globalDictionaries.car.facility.seat
                                .available.icon.name as SVGIconProps["name"],
                            },
                            name: {
                              ...globalDictionaries.car.facility.seat.available
                                .name,
                              label:
                                globalDictionaries.car.facility.seat.available.name.label.replaceAll(
                                  "{{number}}",
                                  item.vehicle.numb_free_seats.toLocaleString(
                                    "de-DE"
                                  )
                                ),
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.empty,
                            icon: {
                              ...globalDictionaries.car.facility.seat.empty
                                .icon,
                              name: globalDictionaries.car.facility.seat.empty
                                .icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                    ...(!!item.vehicle.numb_of_luggages
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.luggage
                              .available,
                            icon: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .available.icon,
                              name: globalDictionaries.car.facility.seat.luggage
                                .available.icon.name as SVGIconProps["name"],
                            },
                            name: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .available.name,
                              label:
                                globalDictionaries.car.facility.seat.luggage.available.name.label.replaceAll(
                                  "{{number}}",
                                  item.vehicle.numb_free_seats.toLocaleString(
                                    "de-DE"
                                  )
                                ),
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.luggage
                              .empty,
                            icon: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .empty.icon,
                              name: globalDictionaries.car.facility.seat.luggage
                                .empty.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                  bottom: [
                    // Smoking
                    ...(!!item.vehicle.smoke_allowed
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.smoking
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.smoking
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.smoking
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.smoking
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.smoking
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.smoking
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Music
                    ...(!!item.vehicle.music_availability
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.music
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.music
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.music
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.music
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.music
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.music
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Pet
                    ...(!!item.vehicle.pet_allowed
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.pets
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.pets
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.pets
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.pets
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.pets
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.pets
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                },
              },

              routes: {
                departure: {
                  place: !item.start_name ? "-" : item.start_name,
                  time: dayjs(item.ride_time.departure_time).format(
                    "HH.mm [Uhr]"
                  ),
                },
                travelTime: {
                  time: !item.eta ? "-" : setDurationTime(item.eta),
                },
                arrival: {
                  place: !item.destination_name ? "-" : item.destination_name,
                  time: !item.eta
                    ? "-"
                    : `${setArrivalTime(
                        dayjs(item.ride_time.departure_time).format("HH:mm"),
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
                  ...(index === 0
                    ? [
                        {
                          id: "bester_preis",
                          label: "Bester Preis",
                          variant: "success" as "success" | "danger",
                        },
                      ]
                    : []),
                  ...(item.user.gender === "female"
                    ? [
                        {
                          id: "fahrerin",
                          label: "Fahrerin (W)",
                          variant: "danger" as "success" | "danger",
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
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
