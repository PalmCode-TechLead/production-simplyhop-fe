import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetBookingMy } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingMyErrorResponseInterface,
  GetBookingMyPayloadRequestInterface,
  GetBookingMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";

export const useGetBookingMy = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(MyListTripContext);

  const payload: GetBookingMyPayloadRequestInterface = {
    params: {
      include: "ride.vehicle.brand,rideTime,user",
    },
  };
  const query = useQuery<
    GetBookingMySuccessResponseInterface,
    GetBookingMyErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetBookingMy(),
    queryFn: () => {
      return fetchGetBookingMy(payload);
    },
    enabled: type === "book",
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: MyListTripActionEnum.SetBookData,
        payload: {
          ...state.book,
          data: data.data.map((item) => {
            return {
              id: String(item.id),
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
                  src: !item.ride.vehicle.image.length
                    ? "/images/general/car.png"
                    : item.ride.vehicle.image[0] ?? "",
                  alt: "car",
                  width: 145,
                  height: 46,
                },
                identity: {
                  name: `${item.ride.vehicle.brand.title} ${item.ride.vehicle.model}`,
                  number: item.ride.vehicle.plate_license,
                },
              },

              routes: {
                date: {
                  label: "Datum",
                  date: dayjs(item.ride_time.departure_time).format("DD.MM.YY"),
                },
                startTime: {
                  label: "Startzeit",
                  time: dayjs(item.ride_time.departure_time).format(
                    "HH.mm [Uhr]"
                  ),
                },
                departure: {
                  place: !item.ride.start_name ? "-" : item.ride.start_name,
                  time: dayjs(item.ride_time.departure_time).format(
                    "HH.mm [Uhr]"
                  ),
                },
                travelTime: {
                  time: !item.ride.eta ? "-" : setDurationTime(item.ride.eta),
                },
                arrival: {
                  place: !item.ride.destination_name
                    ? "-"
                    : item.ride.destination_name,
                  time: !item.ride.eta
                    ? "-"
                    : `${setArrivalTime(
                        dayjs(item.ride_time.departure_time).format("HH:mm"),
                        item.ride.eta
                      )} Uhr`,
                },
              },

              price: {
                initial: {
                  label: "Angebotspreis",
                  price: `€${item.ride.base_price}`,
                },
              },
              cta: {
                detail: {
                  children: "Siehe Details",
                  onClick: () => {},
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
