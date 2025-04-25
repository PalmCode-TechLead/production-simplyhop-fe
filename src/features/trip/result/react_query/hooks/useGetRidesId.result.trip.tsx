import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import {
  GetRidesIdErrorResponseInterface,
  GetRidesIdPayloadRequestInterface,
  GetRidesIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchGetRidesId } from "@/core/services/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";

export const useGetRideId = () => {
  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);

  const payload: GetRidesIdPayloadRequestInterface = {
    path: {
      id: Number(String(rideId ?? "0")),
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
      // dispatch({
      //   type: ResultTripActionEnum.SetRidesData,
      //   payload: {
      //     ...state.rides,
      //     data: data.data.map((item, index) => {
      //       return {
      //         driver: {
      //           profile: {
      //             avatar: {
      //               image: !item.user.avatar
      //                 ? undefined
      //                 : {
      //                     src: item.user.avatar,
      //                     alt: "photo_profile",
      //                   },
      //             },
      //             name: `${item.user.first_name} ${item.user.last_name}`,
      //           },
      //         },
      //         car: {
      //           image: {
      //             src: !item.vehicle.image.length
      //               ? "/images/general/car.png"
      //               : item.vehicle.image[0] ?? "",
      //             alt: "car",
      //             width: 145,
      //             height: 46,
      //           },
      //           identity: {
      //             name: `${item.vehicle.brand.title} ${item.vehicle.model}`,
      //             number: item.vehicle.plate_license,
      //           },
      //           facility: {
      //             top: [
      //               ...(!!item.vehicle.numb_free_seats
      //                 ? [
      //                     {
      //                       ...globalDictionaries.vehicle.seat.available,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.seat.available
      //                           .icon,
      //                         name: globalDictionaries.vehicle.seat
      //                           .available.icon.name as SVGIconProps["name"],
      //                       },
      //                       name: {
      //                         ...globalDictionaries.vehicle.seat.available
      //                           .name,
      //                         label:
      //                           globalDictionaries.vehicle.seat.available.name.label.replaceAll(
      //                             "{{number}}",
      //                             item.vehicle.numb_free_seats.toLocaleString(
      //                               "de-DE"
      //                             )
      //                           ),
      //                       },
      //                     },
      //                   ]
      //                 : [
      //                     {
      //                       ...globalDictionaries.vehicle.seat.empty,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.seat.empty
      //                           .icon,
      //                         name: globalDictionaries.vehicle.seat.empty
      //                           .icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]),
      //               ...(!!item.vehicle.numb_of_luggages
      //                 ? [
      //                     {
      //                       ...globalDictionaries.vehicle.luggage
      //                         .available,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.luggage
      //                           .available.icon,
      //                         name: globalDictionaries.vehicle.luggage
      //                           .available.icon.name as SVGIconProps["name"],
      //                       },
      //                       name: {
      //                         ...globalDictionaries.vehicle.luggage
      //                           .available.name,
      //                         label:
      //                           globalDictionaries.vehicle.luggage.available.name.label.replaceAll(
      //                             "{{number}}",
      //                             item.vehicle.numb_free_seats.toLocaleString(
      //                               "de-DE"
      //                             )
      //                           ),
      //                       },
      //                     },
      //                   ]
      //                 : [
      //                     {
      //                       ...globalDictionaries.vehicle.luggage
      //                         .empty,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.luggage
      //                           .empty.icon,
      //                         name: globalDictionaries.vehicle.luggage
      //                           .empty.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]),
      //             ],
      //             bottom: [
      //               // Smoking
      //               ...(!!item.vehicle.smoke_allowed
      //                 ? [
      //                     {
      //                       ...globalDictionaries.vehicle.smoking
      //                         .allowed,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.smoking
      //                           .allowed.icon,
      //                         name: globalDictionaries.vehicle.smoking
      //                           .allowed.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]
      //                 : [
      //                     {
      //                       ...globalDictionaries.vehicle.smoking
      //                         .prohibited,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.smoking
      //                           .prohibited.icon,
      //                         name: globalDictionaries.vehicle.smoking
      //                           .prohibited.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]),
      //               // Music
      //               ...(!!item.vehicle.music_availability
      //                 ? [
      //                     {
      //                       ...globalDictionaries.vehicle.music
      //                         .allowed,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.music
      //                           .allowed.icon,
      //                         name: globalDictionaries.vehicle.music
      //                           .allowed.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]
      //                 : [
      //                     {
      //                       ...globalDictionaries.vehicle.music
      //                         .prohibited,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.music
      //                           .prohibited.icon,
      //                         name: globalDictionaries.vehicle.music
      //                           .prohibited.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]),
      //               // Pet
      //               ...(!!item.vehicle.pet_allowed
      //                 ? [
      //                     {
      //                       ...globalDictionaries.vehicle.pets
      //                         .allowed,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.pets
      //                           .allowed.icon,
      //                         name: globalDictionaries.vehicle.pets
      //                           .allowed.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]
      //                 : [
      //                     {
      //                       ...globalDictionaries.vehicle.pets
      //                         .prohibited,
      //                       icon: {
      //                         ...globalDictionaries.vehicle.pets
      //                           .prohibited.icon,
      //                         name: globalDictionaries.vehicle.pets
      //                           .prohibited.icon.name as SVGIconProps["name"],
      //                       },
      //                     },
      //                   ]),
      //             ],
      //           },
      //         },
      //         routes: {
      //           departure: {
      //             place: "Munich",
      //             time: !item.ride_times.length
      //               ? "-"
      //               : dayjs(item.ride_times[0].departure_time).format(
      //                   "HH.mm [Uhr]"
      //                 ),
      //           },
      //           travelTime: {
      //             time: "1h 15m",
      //           },
      //           arrival: {
      //             place: "Berlin",
      //             time: "18.30 Uhr",
      //           },
      //         },
      //         price: {
      //           initial: {
      //             label: "Angebotspreis",
      //             price: `€${item.base_price}`,
      //           },
      //         },
      //         ride: {
      //           badge: [
      //             ...(index === 0
      //               ? [
      //                   {
      //                     id: "bester_preis",
      //                     label: "Bester Preis",
      //                     variant: "success" as "success" | "danger",
      //                   },
      //                 ]
      //               : []),
      //             {
      //               id: "fahrerin",
      //               label: "Fahrerin (W)",
      //               variant: "danger",
      //             },
      //           ],
      //         },
      //         cta: {
      //           ride: {
      //             href: "/mitfahrt-suchen/result?city_id=ChIJ2V-Mo_l1nkcRfZixfUq4DAE&origin_id=ChIJuWG8S2DfnUcRbT-8T9g5EVY&destination_id=ChIJs4qDdmLfnUcRBbJZt1DoAfs&date=2025-03-22&adult=1&children=0&ride_id=1",
      //             children: "Mitfahren",
      //           },
      //         },
      //       };
      //     }),
      //   },
      // });
    }
  }, [query.data, query.isFetching]);
  return query;
};
