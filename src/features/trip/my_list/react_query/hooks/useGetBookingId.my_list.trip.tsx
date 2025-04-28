import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

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
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(MyListTripContext);
  const id = searchParams.get("booking_id");

  const payload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !id ? "0" : String(id),
    },
    params: {
      include: "ride.vehicle.brand,user",
    },
  };
  const query = useQuery<
    GetBookingIdSuccessResponseInterface,
    GetBookingIdErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetBookingId(),
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
        type: MyListTripActionEnum.SetBookData,
        payload: {
          ...state.book,
          detail: {
            id: String(item.id),
            driver: {
              profile: {
                avatar: !item.user?.avatar
                  ? undefined
                  : {
                      src: item.user.avatar,
                      alt: "photo_profile",
                    },
                name: `${item.user?.first_name} ${item.user?.last_name}`,
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
                date: dayjs(item.ride_time?.departure_time).format("DD.MM.YY"),
              },
              startTime: {
                label: "Startzeit",
                time: dayjs(item.ride_time?.departure_time).format(
                  "HH.mm [Uhr]"
                ),
              },
              departure: {
                place: !item.ride?.start_name ? "-" : item.ride?.start_name,
                time: dayjs(item.ride_time?.departure_time).format(
                  "HH.mm [Uhr]"
                ),
              },
              travelTime: {
                time: !item.ride?.eta ? "-" : setDurationTime(item.ride.eta),
              },
              arrival: {
                place: !item.ride?.destination_name
                  ? "-"
                  : item.ride.destination_name,
                time: !item.ride?.eta
                  ? "-"
                  : `${setArrivalTime(
                      dayjs(item.ride_time?.departure_time).format("HH:mm"),
                      item.ride.eta
                    )} Uhr`,
              },
            },

            price: {
              initial: {
                label: "Angebotspreis",
                price: `€${item.ride?.base_price}`,
              },
            },
            cta: {
              detail: {
                children: "Siehe Details",
                href: AppCollectionURL.private.myList(
                  urlSearchParams.toString()
                ),
              },
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
