import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessagesListByRoom } from "@/core/services/rest/simplyhop/messages";
import {
  GetMessagesListByRoomErrorResponseInterface,
  GetMessagesListByRoomPayloadRequestInterface,
  GetMessagesListByRoomSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/messages";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrToday from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/de";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { MessageContent } from "@/core/models/data";

dayjs.extend(utc);
dayjs.extend(isSameOrToday);
dayjs.locale("de");

function formatChatTime(timestamp: string) {
  const time = dayjs.utc(timestamp).local(); // convert ke local time
  const now = dayjs();

  if (time.isSame(now, "day")) {
    return time.format("h:mm A"); // Contoh: 3:45 PM
  } else {
    return time.format("DD MMM YYYY"); // Contoh: 22 Apr 2025
  }
}

export const useGetMessagesListByRoom = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const payload: GetMessagesListByRoomPayloadRequestInterface = {
    path: {
      roomId: messageRoomId,
    },
    params: {
      include:
        "booking,bookingCount,bookingExists,booking.rideTime,booking.ride,booking.ride.vehicle,booking.ride.vehicle.brand,driver,driverCount,driverExists,driver.profile,passenger,passengerCount,passengerExists,passenger.profile",
    },
  };

  const query = useQuery<
    GetMessagesListByRoomSuccessResponseInterface,
    GetMessagesListByRoomErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessagesListByRoom(),
    queryFn: () => {
      return fetchGetMessagesListByRoom(payload);
    },
    enabled: !!id && !!state.room.id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: ChatTripActionEnum.SetRoomData,
        payload: {
          ...state.room,
          message: {
            ...state.room.message,
            items: data.data.map((item) => {
              const isPassenger = userState.profile.id === item.passenger_id;
              const isSender = userState.profile.id === item.sender_id;
              const content =
                typeof item.contents === "string"
                  ? JSON.parse(item.contents)
                  : (item.contents as MessageContent);
              return {
                id: String(id),
                type: content.type,
                role: isSender ? "sender" : "recipient",
                // TODO: need rules if more than one day etc2
                time: formatChatTime(item.created_at),
                name: isPassenger
                  ? `${item?.passenger?.first_name} ${item.passenger?.last_name}`
                  : `${item.driver?.first_name} ${item.driver?.last_name}`,
                avatar: {
                  src: isPassenger
                    ? item.passenger?.avatar
                    : item.driver?.avatar,
                  width: 36,
                  height: 36,
                  alt: isSender ? "sender" : "recipient",
                },
                message: content.message,
                booking: {
                  time: dayjs(item.created_at).format("hh:mma"),
                  car: {
                    image: {
                      src: !item.booking?.ride?.vehicle?.image.length
                        ? "/images/general/car.png"
                        : item.booking.ride?.vehicle.image[0] ??
                          "/images/general/car.png",
                      alt: "car",
                      width: 145,
                      height: 46,
                    },
                    identity: {
                      name: `${item.booking?.ride?.vehicle?.brand?.title} ${item.booking?.ride?.vehicle?.model}`,
                      number: item.booking?.ride?.vehicle?.plate_license,
                    },
                    facility: {
                      top: [
                        ...(!!item.booking?.ride_time?.available_seats
                          ? [
                              {
                                ...globalDictionaries.car.facility.seat
                                  .available,
                                icon: {
                                  ...globalDictionaries.car.facility.seat
                                    .available.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .available.icon
                                    .name as SVGIconProps["name"],
                                },
                                name: {
                                  ...globalDictionaries.car.facility.seat
                                    .available.name,
                                  label:
                                    globalDictionaries.car.facility.seat.available.name.label.replaceAll(
                                      "{{number}}",
                                      item.booking.ride_time.available_seats.toLocaleString(
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
                                  name: globalDictionaries.car.facility.seat
                                    .empty.icon.name as SVGIconProps["name"],
                                },
                              },
                            ]),
                        ...(!!item.booking?.ride?.vehicle?.numb_of_luggages
                          ? [
                              {
                                ...globalDictionaries.car.facility.seat.luggage
                                  .available,
                                icon: {
                                  ...globalDictionaries.car.facility.seat
                                    .luggage.available.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .luggage.available.icon
                                    .name as SVGIconProps["name"],
                                },
                                name: {
                                  ...globalDictionaries.car.facility.seat
                                    .luggage.available.name,
                                  label:
                                    globalDictionaries.car.facility.seat.luggage.available.name.label.replaceAll(
                                      "{{number}}",
                                      item.booking.ride.vehicle.numb_free_seats.toLocaleString(
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
                                  ...globalDictionaries.car.facility.seat
                                    .luggage.empty.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .luggage.empty.icon
                                    .name as SVGIconProps["name"],
                                },
                              },
                            ]),
                      ],
                      bottom: [
                        // Smoking
                        ...(!!item.booking?.ride?.vehicle?.smoke_allowed
                          ? [
                              {
                                ...globalDictionaries.car.facility.seat.smoking
                                  .allowed,
                                icon: {
                                  ...globalDictionaries.car.facility.seat
                                    .smoking.allowed.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .smoking.allowed.icon
                                    .name as SVGIconProps["name"],
                                },
                              },
                            ]
                          : [
                              {
                                ...globalDictionaries.car.facility.seat.smoking
                                  .prohibited,
                                icon: {
                                  ...globalDictionaries.car.facility.seat
                                    .smoking.prohibited.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .smoking.prohibited.icon
                                    .name as SVGIconProps["name"],
                                },
                              },
                            ]),
                        // Music
                        ...(!!item.booking?.ride?.vehicle?.music_availability
                          ? [
                              {
                                ...globalDictionaries.car.facility.seat.music
                                  .allowed,
                                icon: {
                                  ...globalDictionaries.car.facility.seat.music
                                    .allowed.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .music.allowed.icon
                                    .name as SVGIconProps["name"],
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
                                  name: globalDictionaries.car.facility.seat
                                    .music.prohibited.icon
                                    .name as SVGIconProps["name"],
                                },
                              },
                            ]),
                        // Pet
                        ...(!!item.booking?.ride?.vehicle?.pet_allowed
                          ? [
                              {
                                ...globalDictionaries.car.facility.seat.pets
                                  .allowed,
                                icon: {
                                  ...globalDictionaries.car.facility.seat.pets
                                    .allowed.icon,
                                  name: globalDictionaries.car.facility.seat
                                    .pets.allowed.icon
                                    .name as SVGIconProps["name"],
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
                                  name: globalDictionaries.car.facility.seat
                                    .pets.prohibited.icon
                                    .name as SVGIconProps["name"],
                                },
                              },
                            ]),
                      ],
                    },
                  },

                  routes: {
                    departure: {
                      place: !item.booking?.ride?.start_name
                        ? "-"
                        : item.booking.ride.start_name,
                      time: dayjs(
                        item.booking?.ride_time?.departure_time
                      ).format("HH.mm [Uhr]"),
                    },
                    travelTime: {
                      time: !item.booking?.ride?.eta
                        ? "-"
                        : setDurationTime(item.booking.ride.eta),
                    },
                    arrival: {
                      place: !item.booking?.ride?.destination_name
                        ? "-"
                        : item.booking.ride.destination_name,
                      time: !item.booking?.ride?.eta
                        ? "-"
                        : `${setArrivalTime(
                            dayjs(
                              item.booking.ride_time?.departure_time
                            ).format("HH:mm"),
                            item.booking.ride.eta
                          )} Uhr`,
                    },
                  },

                  price: {
                    initial: {
                      label: "Angebotspreis",
                      price: `€${item.booking?.ride?.base_price}`,
                    },
                    offered: {
                      label: "Angebotener Preis",
                      price: !item.booking?.offered_price
                        ? "-"
                        : `€${item.booking.offered_price}`,
                    },
                  },
                  note: {
                    label: "Hinweis",
                    note: item.booking?.ride?.additional_info,
                  },
                },
                driver: null,
              };
            }),
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
