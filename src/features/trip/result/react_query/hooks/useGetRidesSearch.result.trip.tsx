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
import utc from "dayjs/plugin/utc";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { usePathname, useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDriverLabel } from "@/core/utils/driver/functions";
import { formatDisplayName } from "@/core/utils/name/functions";

dayjs.extend(utc);

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
      start_lat: state.filters.origin.selected.lat_lng?.lat ?? 0,
      start_long: state.filters.origin.selected.lat_lng?.lng ?? 0,
      destination_lat: state.filters.destination.selected.lat_lng?.lat ?? 0,
      destination_long: state.filters.destination.selected.lat_lng?.lng ?? 0,
      departure_date: dayjs(state.filters.date.selected).isSame(dayjs(), "day")
        ? undefined
        : dayjs(state.filters.date.selected).format("YYYY-MM-DD"),
      departure_time__lte: dayjs(state.filters.date.selected).isSame(
        dayjs(),
        "day"
      )
        ? dayjs().endOf("day").format("YYYY-MM-DDTHH:mm:ss")
        : undefined,
      departure_time__gte: dayjs(state.filters.date.selected).isSame(
        dayjs(),
        "day"
      )
        ? dayjs().format("YYYY-MM-DDTHH:mm:ss")
        : undefined,
      // start_lat: 52.5200066,
      // start_long: 13.414954,
      // destination_lat: 48.1351253,
      // destination_long: 11.5819804,
      include: "vehicle,user,vehicle.brand,vehicle.category",
      available_seats__gte: String(
        Number(String(adult ?? "0")) + Number(String(children ?? "0"))
      ),
      // Need to be integrated
      "filter[luggage_allowed]": !state.advanced_filter.luggage.selected.length
        ? undefined
        : state.advanced_filter.luggage.selected.length === 1
        ? state.advanced_filter.luggage.selected[0].id === "true"
        : undefined,
      music_availability: !state.advanced_filter.music.selected.length
        ? undefined
        : state.advanced_filter.music.selected.length === 1
        ? state.advanced_filter.music.selected[0].id === "true"
        : undefined,
      smoke_allowed: !state.advanced_filter.smoker.selected.length
        ? undefined
        : state.advanced_filter.smoker.selected.length === 1
        ? state.advanced_filter.smoker.selected[0].id === "true"
        : undefined,
      pet_allowed: !state.advanced_filter.pets.selected.length
        ? undefined
        : state.advanced_filter.pets.selected.length === 1
        ? state.advanced_filter.pets.selected[0].id === "true"
        : undefined,
      "filter[user.gender]": !state.advanced_filter.driver_gender.selected
        .length
        ? undefined
        : state.advanced_filter.driver_gender.selected.length === 1
        ? state.advanced_filter.driver_gender.selected[0].id === "undefined"
          ? undefined
          : state.advanced_filter.driver_gender.selected[0].id
        : undefined,
      sort: !state.advanced_filter.sort.selected?.id
        ? "average_distance"
        : state.advanced_filter.sort.selected.id,
      "page[number]": state.rides.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };

  const queryPayload = {
    url: fullPath,
    include: "vehicle,user,vehicle.brand,vehicle.category",
    // Need to be integrated
    "filter[luggage_allowed]": !state.advanced_filter.luggage.selected.length
      ? undefined
      : state.advanced_filter.luggage.selected.length === 1
      ? state.advanced_filter.luggage.selected[0].id === "true"
      : undefined,
    music_availability: !state.advanced_filter.music.selected.length
      ? undefined
      : state.advanced_filter.music.selected.length === 1
      ? state.advanced_filter.music.selected[0].id === "true"
      : undefined,
    smoke_allowed: !state.advanced_filter.smoker.selected.length
      ? undefined
      : state.advanced_filter.smoker.selected.length === 1
      ? state.advanced_filter.smoker.selected[0].id === "true"
      : undefined,
    pet_allowed: !state.advanced_filter.pets.selected.length
      ? undefined
      : state.advanced_filter.pets.selected.length === 1
      ? state.advanced_filter.pets.selected[0].id === "true"
      : undefined,
    "filter[user.gender]": !state.advanced_filter.driver_gender.selected.length
      ? undefined
      : state.advanced_filter.driver_gender.selected.length === 1
      ? state.advanced_filter.driver_gender.selected[0].id === "undefined"
        ? undefined
        : state.advanced_filter.driver_gender.selected[0].id
      : undefined,
    sort: !state.advanced_filter.sort.selected?.id
      ? "average_distance"
      : state.advanced_filter.sort.selected.id,
    "page[number]": state.rides.pagination.current,
    "page[size]": PAGINATION.SIZE,
  };

  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.GetRidesSearch(queryPayload),
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

      const newPayload = data.data.map((item) => {
        return {
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
              name: formatDisplayName({
                first_name: item.user.first_name,
                email: item.user.email,
              }),
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
              name: !item.vehicle.brand?.title
                ? item.vehicle.model ?? ""
                : !item.vehicle.model
                ? item.vehicle.brand?.title ?? ""
                : `${item.vehicle.brand?.title} ${item.vehicle.model}`,
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
                          label: !item.maxtwo_backseat
                            ? globalDictionaries.vehicle.seat.available.name.label
                                .replaceAll(
                                  "{{number}}",
                                  item.available_seats.toLocaleString("de-DE")
                                )
                                .replaceAll("(Max. 2 auf der Rückbank)", "")
                            : globalDictionaries.vehicle.seat.available.name.label.replaceAll(
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
                          ...globalDictionaries.vehicle.luggage.available.icon,
                          name: globalDictionaries.vehicle.luggage.available
                            .icon.name as SVGIconProps["name"],
                        },
                        name: {
                          ...globalDictionaries.vehicle.luggage.available.name,
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
                          name: globalDictionaries.vehicle.smoking.allowed.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.smoking.prohibited,
                        icon: {
                          ...globalDictionaries.vehicle.smoking.prohibited.icon,
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
                          name: globalDictionaries.vehicle.music.prohibited.icon
                            .name as SVGIconProps["name"],
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
                          name: globalDictionaries.vehicle.pets.prohibited.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]),
              ],
            },
          },

          routes: {
            date: {
              label: "Datum",
              date: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("DD.MM.YY"),
            },
            departure: {
              place: !item.start_name ? "-" : item.start_name,
              time: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("HH.mm [Uhr]"),
            },
            travelTime: {
              time: !item.eta ? "-" : setDurationTime(item.eta),
            },
            umWeg: {
              label: globalDictionaries.vehicle.umweg.label.text.replaceAll(
                "{{number}}",
                !item.waiting_time ? "0" : item.waiting_time
              ),
              icon: {
                ...globalDictionaries.vehicle.umweg.label.icon,
                name: globalDictionaries.vehicle.umweg.label.icon
                  .name as SVGIconProps["name"],
              },
            },
            arrival: {
              place: !item.destination_name ? "-" : item.destination_name,
              time:
                !item.eta || !item.departure_time
                  ? "-"
                  : `${setArrivalTime(
                      dayjs.utc(item.departure_time).format("HH:mm"),
                      item.eta
                    )} Uhr`,
            },
          },

          price: {
            initial: {
              label: "Preis",
              price: formatEuro(item.base_price * totalPassenger),
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

              ...formatDriverLabel(
                globalDictionaries.personal_information.gender.options.items,
                item.user.gender
              ),
            ],
          },
          cta: {
            ride: {
              href: `${fullPath}&${RIDE_FILTER.RIDE_ID}=${item.id}`,
              children: "Mitfahren",
            },
          },
        };
      });

      dispatch({
        type: ResultTripActionEnum.SetRidesDataData,
        payload:
          state.rides.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.rides.data
            : [...state.rides.data, ...newPayload],
      });
      dispatch({
        type: ResultTripActionEnum.SetRidesDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
