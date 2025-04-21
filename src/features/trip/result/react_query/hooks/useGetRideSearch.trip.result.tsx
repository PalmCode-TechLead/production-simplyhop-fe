import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import { ResultTripActionEnum, ResultTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/ride/search.get";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchSuccessResponseInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import dayjs from "dayjs";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";

export const useGetRideSearch = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      // start_lat: state.filters.origin.selected.lat_lng?.lat ?? 0,
      // start_long: state.filters.origin.selected.lat_lng?.lng ?? 0,
      // destination_lat: state.filters.destination.selected.lat_lng?.lat ?? 0,
      // destination_long: state.filters.destination.selected.lat_lng?.lng ?? 0,
      // include: "rideTimes,vehicle,user,vehicle.brand,vehicle.category",
      start_lat: 52.5200066,
      start_long: 13.414954,
      destination_lat: 48.1351253,
      destination_long: 11.5819804,
      include: "rideTimes,vehicle,user,vehicle.brand,vehicle.category",
      // sort:'-base_price'
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.RestSimplyHopGetRideSearch(),
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

      dispatch({
        type: ResultTripActionEnum.SetRidesData,
        payload: {
          ...state.rides,
          data: data.data.map((item, index) => {
            return {
              driver: {
                profile: {
                  avatar: {
                    image: !item.user.avatar
                      ? undefined
                      : {
                          src: item.user.avatar,
                          alt: "photo_profile",
                        },
                  },
                  name: `${item.user.first_name} ${item.user.last_name}`,
                },
              },
              car: {
                image: {
                  src: !item.vehicle.image.length
                    ? "/images/general/car.png"
                    : item.vehicle.image[0] ?? "",
                  alt: "car",
                  width: 145,
                  height: 46,
                },
                identity: {
                  name: `${item.vehicle.brand.title} ${item.vehicle.model}`,
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
                  place: "Munich",
                  time: !item.ride_times.length
                    ? "-"
                    : dayjs(item.ride_times[0].departure_time).format(
                        "HH.mm [Uhr]"
                      ),
                },
                travelTime: {
                  time: "1h 15m",
                },
                arrival: {
                  place: "Berlin",
                  time: "18.30 Uhr",
                },
              },

              price: {
                initial: {
                  label: "Angebotspreis",
                  price: `€${item.base_price}`,
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

                  {
                    id: "fahrerin",
                    label: "Fahrerin (W)",
                    variant: "danger",
                  },
                ],
              },
              cta: {
                ride: {
                  href: "/mitfahrt-suchen/result?city_id=ChIJ2V-Mo_l1nkcRfZixfUq4DAE&origin_id=ChIJuWG8S2DfnUcRbT-8T9g5EVY&destination_id=ChIJs4qDdmLfnUcRBbJZt1DoAfs&date=2025-03-22&adult=1&children=0&ride_id=1",
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
