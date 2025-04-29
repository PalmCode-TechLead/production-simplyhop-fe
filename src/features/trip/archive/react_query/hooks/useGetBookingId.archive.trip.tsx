import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArchiveTripReactQueryKey } from "../keys";

import { ArchiveTripActionEnum, ArchiveTripContext } from "../../context";

import { fetchGetBookingId } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingIdErrorResponseInterface,
  GetBookingIdPayloadRequestInterface,
  GetBookingIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetBookingId = () => {
  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ArchiveTripContext);
  const id = searchParams.get("booking_id");

  const payload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !id ? "0" : String(id),
    },
    params: {
      include: "ride.vehicle.brand,user,ride.user",
    },
  };
  const query = useQuery<
    GetBookingIdSuccessResponseInterface,
    GetBookingIdErrorResponseInterface
  >({
    queryKey: ArchiveTripReactQueryKey.GetBookingId(),
    queryFn: () => {
      return fetchGetBookingId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const item = data.data;
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.append("booking_id", String(item.id));
      dispatch({
        type: ArchiveTripActionEnum.SetBookData,
        payload: {
          ...state.book,
          detail: {
            id: String(item.id),
            message: {
              link: AppCollectionURL.private.chat(
                `id=${item.message_room?.id}&bookingId=${item.id}`
              ),
            },
            driver: {
              profile: {
                avatar: !item.ride?.user?.avatar
                  ? undefined
                  : {
                      src: item.ride?.user.avatar,
                      alt: "photo_profile",
                    },
                name: `${item.ride?.user?.first_name} ${item.ride?.user?.last_name}`,
              },
            },
            car: {
              image: {
                src: !item.ride?.vehicle?.image.length
                  ? "/images/general/car.png"
                  : item.ride.vehicle.image[0] ?? "/images/general/car.png",
                alt: "car",
                width: 145,
                height: 46,
              },
              identity: {
                name: `${item.ride?.vehicle?.brand?.title} ${item.ride?.vehicle?.model}`,
                number: item.ride?.vehicle?.plate_license,
              },
            },

            routes: {
              date: {
                label: "Datum",
                date: !item.ride?.departure_time
                  ? "-"
                  : dayjs(item.ride?.departure_time).format("DD.MM.YY"),
              },
              startTime: {
                label: "Startzeit",
                time: !item.ride?.departure_time
                  ? "-"
                  : dayjs(item.ride?.departure_time).format("HH.mm [Uhr]"),
              },
              departure: {
                place: !item.ride?.start_name ? "-" : item.ride?.start_name,
                time: !item.ride?.departure_time
                  ? "-"
                  : dayjs(item.ride?.departure_time).format("HH.mm [Uhr]"),
              },
              travelTime: {
                time: !item.ride?.eta ? "-" : setDurationTime(item.ride.eta),
              },
              arrival: {
                place: !item.ride?.destination_name
                  ? "-"
                  : item.ride.destination_name,
                time:
                  !item.ride?.eta || !item.ride.departure_time
                    ? "-"
                    : `${setArrivalTime(
                        dayjs(item.ride?.departure_time).format("HH:mm"),
                        item.ride.eta
                      )} Uhr`,
              },
            },

            price: {
              label: "Angebotspreis",
              price: `€${item.ride?.base_price}`,
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
