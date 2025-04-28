// import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

// import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetRidesId } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesIdErrorResponseInterface,
  GetRidesIdPayloadRequestInterface,
  GetRidesIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
// import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
// import dayjs from "dayjs";
// import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetRidesId = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  // const { state, dispatch } = React.useContext(MyListTripContext);
  const id = searchParams.get("ride_id");

  const payload: GetRidesIdPayloadRequestInterface = {
    path: {
      id: !id ? 0 : Number(String(id)),
    },
    params: {
      include: "vehicle.brand,rideTimes,user,bookings,bookings.user",
      booking_status: "accepted",
    },
  };
  const query = useQuery<
    GetRidesIdSuccessResponseInterface,
    GetRidesIdErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetRidesId(payload),
    queryFn: () => {
      return fetchGetRidesId(payload);
    },
    enabled: !type && !!id,
  });

  // React.useEffect(() => {
  //   if (!!query.data && !query.isFetching) {
  //     const data = query.data;
  //     const item = data.data;
  //     const urlSearchParams = new URLSearchParams(searchParams.toString());
  //     urlSearchParams.append("ride_id", String(item.id));
  //     dispatch({
  //       type: MyListTripActionEnum.SetRideData,
  //       payload: {
  //         ...state.ride,
  //         detail: {
  //           id: String(item.id),
  //           driver: {
  //             profile: {
  //               avatar: !item.user.avatar
  //                 ? undefined
  //                 : {
  //                     src: item.user.avatar,
  //                     alt: "photo_profile",
  //                   },
  //               name: `${item.user.first_name} ${item.user.last_name}`,
  //             },
  //           },
  //           car: {
  //             image: {
  //               src: !item.vehicle.image.length
  //                 ? "/images/general/car.png"
  //                 : item.vehicle.image[0] ?? "/images/general/car.png",
  //               alt: "car",
  //               width: 145,
  //               height: 46,
  //             },
  //             identity: {
  //               name: `${item.vehicle.brand?.title} ${item.vehicle.model}`,
  //               number: item.vehicle.plate_license,
  //             },
  //           },

  //           routes: {
  //             date: {
  //               label: "Datum",
  //               date: !item.ride_time
  //                 ? "-"
  //                 : dayjs(item.ride_time.departure_time).format("DD.MM.YY"),
  //             },
  //             startTime: {
  //               label: "Startzeit",
  //               time: !item.ride_time
  //                 ? "-"
  //                 : dayjs(item.ride_time.departure_time).format("HH.mm [Uhr]"),
  //             },
  //             departure: {
  //               place: !item.start_name ? "-" : item.start_name,
  //               time: !item.ride_time
  //                 ? "-"
  //                 : dayjs(item.ride_time.departure_time).format("HH.mm [Uhr]"),
  //             },
  //             travelTime: {
  //               time: !item.eta ? "-" : setDurationTime(item.eta),
  //             },
  //             arrival: {
  //               place: !item.destination_name ? "-" : item.destination_name,
  //               time: !item.eta
  //                 ? "-"
  //                 : `${setArrivalTime(
  //                     dayjs(item.ride_time.departure_time).format("HH:mm"),
  //                     item.eta
  //                   )} Uhr`,
  //             },
  //           },

  //           price: {
  //             initial: {
  //               label: "Angebotspreis",
  //               price: item.base_price === null ? "-" : `€${item.base_price}`,
  //             },
  //           },
  //           cta: {
  //             detail: {
  //               children: "Siehe Details",
  //               href: AppCollectionURL.private.myList(
  //                 urlSearchParams.toString()
  //               ),
  //             },
  //           },

  //           booking: item.bookings.map((bookingItem, index) => {
  //             return {
  //               booking: {
  //                 number: String(index + 1),
  //                 name: `${bookingItem.user?.first_name} ${bookingItem.user?.last_name}`,
  //               },
  //               route: {
  //                 origin: !item.start_name ? "-" : item.start_name,
  //                 destination: !item.destination_name
  //                   ? "-"
  //                   : item.destination_name,
  //               },
  //               // passenger: {
  //               //   adult: (
  //               //     bookingItem.seats - bookingItem.child_seats
  //               //   ).toLocaleString("de-DE"),
  //               //   children: bookingItem.child_seats.toLocaleString("de-DE"),
  //               // },
  //               price: {
  //                 value: bookingItem.total_amount.toLocaleString("de-DE"),
  //               },
  //             };
  //           }),
  //           price: {
  //             label: "Angebotspreis",
  //             price: `€${item.base_price.toLocaleString("de-DE")}`,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [query.data, query.isFetching]);
  return query;
};
