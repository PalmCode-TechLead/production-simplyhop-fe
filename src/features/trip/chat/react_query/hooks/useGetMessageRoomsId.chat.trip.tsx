import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessageRoomsId } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsIdErrorResponseInterface,
  GetMessageRoomsIdPayloadRequestInterface,
  GetMessageRoomsIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { UserContext } from "@/core/modules/app/context";
import { useSearchParams } from "next/navigation";

export const useGetMessageRoomsId = () => {
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const payload: GetMessageRoomsIdPayloadRequestInterface = {
    path: {
      id: messageRoomId,
    },
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
    },
  };
  const query = useQuery<
    GetMessageRoomsIdSuccessResponseInterface,
    GetMessageRoomsIdErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsId(payload),
    queryFn: () => {
      return fetchGetMessageRoomsId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      const isPassenger = userState.profile.id === data.data.passenger_id;
      dispatch({
        type: ChatTripActionEnum.SetRoomData,
        payload: {
          ...state.room,
          id: data.data.id,
          header: {
            ...state.room.header,
            avatar: {
              src: !isPassenger
                ? data.data.passenger?.avatar
                : data.data.driver?.avatar,
              alt: isPassenger ? "passenger" : "driver",
            },
            name: !isPassenger
              ? `${data.data.passenger?.first_name} ${data.data.passenger?.last_name}`
              : `${data.data.driver?.first_name} ${data.data.driver?.last_name}`,
          },
          booking: {
            status: data.data.booking?.status ?? null,
          },
        },
      });
      // dispatch({
      //   type: ChatTripActionEnum.SetOfferData,
      //   payload: {
      //     ...state.offer,
      //     ride: {
      //       id: String(data.data.id),
      //       driver: {
      //         profile: {
      //           id: String(data.data.driver?.id),
      //           avatar: !data.data.driver?.avatar
      //             ? undefined
      //             : {
      //                 src: data.data.driver?.avatar,
      //                 alt: "photo_profile",
      //               },
      //           name: `${data.data.driver?.first_name} ${data.data.driver?.last_name}`,
      //         },
      //       },
      //       car: {
      //         image: {
      //           src: !item.vehicle.image.length
      //             ? "/images/general/car.png"
      //             : item.vehicle.image[0] ?? "/images/general/car.png",
      //           alt: "car",
      //           width: 145,
      //           height: 46,
      //         },
      //         identity: {
      //           name: `${item.vehicle.brand?.title} ${item.vehicle.model}`,
      //           number: item.vehicle.plate_license,
      //         },
      //         facility: {
      //           top: [
      //             ...(!!item.ride_time.available_seats
      //               ? [
      //                   {
      //                     ...globalDictionaries.vehicle.seat.available,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.seat.available.icon,
      //                       name: globalDictionaries.vehicle.seat.available.icon
      //                         .name as SVGIconProps["name"],
      //                     },
      //                     name: {
      //                       ...globalDictionaries.vehicle.seat.available.name,
      //                       label:
      //                         globalDictionaries.vehicle.seat.available.name.label.replaceAll(
      //                           "{{number}}",
      //                           item.ride_time.available_seats.toLocaleString(
      //                             "de-DE"
      //                           )
      //                         ),
      //                     },
      //                   },
      //                 ]
      //               : [
      //                   {
      //                     ...globalDictionaries.vehicle.seat.empty,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.seat.empty.icon,
      //                       name: globalDictionaries.vehicle.seat.empty.icon
      //                         .name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]),
      //             ...(!!item.vehicle.numb_of_luggages
      //               ? [
      //                   {
      //                     ...globalDictionaries.vehicle.luggage.available,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.luggage.available
      //                         .icon,
      //                       name: globalDictionaries.vehicle.luggage.available
      //                         .icon.name as SVGIconProps["name"],
      //                     },
      //                     name: {
      //                       ...globalDictionaries.vehicle.luggage.available
      //                         .name,
      //                       label:
      //                         globalDictionaries.vehicle.luggage.available.name.label.replaceAll(
      //                           "{{number}}",
      //                           item.vehicle.numb_free_seats.toLocaleString(
      //                             "de-DE"
      //                           )
      //                         ),
      //                     },
      //                   },
      //                 ]
      //               : [
      //                   {
      //                     ...globalDictionaries.vehicle.luggage.empty,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.luggage.empty.icon,
      //                       name: globalDictionaries.vehicle.luggage.empty.icon
      //                         .name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]),
      //           ],
      //           bottom: [
      //             // Smoking
      //             ...(!!item.vehicle.smoke_allowed
      //               ? [
      //                   {
      //                     ...globalDictionaries.vehicle.smoking.allowed,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.smoking.allowed.icon,
      //                       name: globalDictionaries.vehicle.smoking.allowed
      //                         .icon.name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]
      //               : [
      //                   {
      //                     ...globalDictionaries.vehicle.smoking.prohibited,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.smoking.prohibited
      //                         .icon,
      //                       name: globalDictionaries.vehicle.smoking.prohibited
      //                         .icon.name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]),

      //             // Music
      //             ...(!!item.vehicle.music_availability
      //               ? [
      //                   {
      //                     ...globalDictionaries.vehicle.music.allowed,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.music.allowed.icon,
      //                       name: globalDictionaries.vehicle.music.allowed.icon
      //                         .name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]
      //               : [
      //                   {
      //                     ...globalDictionaries.vehicle.music.prohibited,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.music.prohibited.icon,
      //                       name: globalDictionaries.vehicle.music.prohibited
      //                         .icon.name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]),

      //             // Pet
      //             ...(!!item.vehicle.pet_allowed
      //               ? [
      //                   {
      //                     ...globalDictionaries.vehicle.pets.allowed,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.pets.allowed.icon,
      //                       name: globalDictionaries.vehicle.pets.allowed.icon
      //                         .name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]
      //               : [
      //                   {
      //                     ...globalDictionaries.vehicle.pets.prohibited,
      //                     icon: {
      //                       ...globalDictionaries.vehicle.pets.prohibited.icon,
      //                       name: globalDictionaries.vehicle.pets.prohibited
      //                         .icon.name as SVGIconProps["name"],
      //                     },
      //                   },
      //                 ]),
      //           ],
      //         },
      //       },

      //       routes: {
      //         departure: {
      //           place: !item.start_name ? "-" : item.start_name,
      //           time: dayjs(item.ride_time.departure_time).format(
      //             "HH.mm [Uhr]"
      //           ),
      //         },
      //         travelTime: {
      //           time: !item.eta ? "-" : setDurationTime(item.eta),
      //           waitingTime: !item.waiting_time ? "" : item.waiting_time,
      //         },
      //         arrival: {
      //           place: !item.destination_name ? "-" : item.destination_name,
      //           time: !item.eta
      //             ? "-"
      //             : `${setArrivalTime(
      //                 dayjs(item.ride_time.departure_time).format("HH:mm"),
      //                 item.eta
      //               )} Uhr`,
      //         },
      //       },

      //       price: {
      //         initial: {
      //           label: "Angebotspreis",
      //           price: `€${item.base_price * totalPassenger}`,
      //         },
      //       },
      //       ride: {
      //         badge: [
      //           ...(index === 0
      //             ? [
      //                 {
      //                   id: "bester_preis",
      //                   label: "Bester Preis",
      //                   variant: "success" as "success" | "danger",
      //                 },
      //               ]
      //             : []),
      //           ...(item.user.gender === "female"
      //             ? [
      //                 {
      //                   id: "fahrerin",
      //                   label: "Fahrerin (W)",
      //                   variant: "danger" as "success" | "danger",
      //                 },
      //               ]
      //             : []),
      //           ...(item.maxtwo_backseat
      //             ? [
      //                 {
      //                   id: "max_two_backseat",
      //                   label: "Max. 2 auf der Rückbank",
      //                   variant: "danger" as "danger" | "success",
      //                 },
      //               ]
      //             : []),
      //         ],
      //       },
      //       cta: {
      //         ride: {
      //           href: `${fullPath}&${RIDE_FILTER.RIDE_ID}=${item.id}`,
      //           children: "Mitfahren",
      //         },
      //       },
      //     },
      //   },
      // });
    }
  }, [query.data, query.isFetching]);
  return query;
};
