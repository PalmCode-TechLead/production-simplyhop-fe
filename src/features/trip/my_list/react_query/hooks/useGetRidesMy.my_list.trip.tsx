import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetRidesMy } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesMyErrorResponseInterface,
  GetRidesMyPayloadRequestInterface,
  GetRidesMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";

export const useGetRidesMy = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(MyListTripContext);

  const payload: GetRidesMyPayloadRequestInterface = {
    params: {
      include: "vehicle.brand,rideTimes,user",
    },
  };
  const query = useQuery<
    GetRidesMySuccessResponseInterface,
    GetRidesMyErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetRidesMy(),
    queryFn: () => {
      return fetchGetRidesMy(payload);
    },
    enabled: !type,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: MyListTripActionEnum.SetRideData,
        payload: {
          ...state.ride,
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
                  src: !item.vehicle.image.length
                    ? "/images/general/car.png"
                    : item.vehicle.image[0] ?? "/images/general/car.png",
                  alt: "car",
                  width: 145,
                  height: 46,
                },
                identity: {
                  name: `${item.vehicle.brand.title} ${item.vehicle.model}`,
                  number: item.vehicle.plate_license,
                },
              },

              routes: {
                date: {
                  label: "Datum",
                  date: "24.02.25",
                },
                startTime: {
                  label: "Startzeit",
                  time: "17:30 Uhr",
                },
                departure: {
                  place: !item.start_name ? "-" : item.start_name,
                  time: !item.ride_times.length
                    ? "-"
                    : dayjs(item.ride_times[0].departure_time).format(
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
                        dayjs(item.ride_times[0].departure_time).format(
                          "HH:mm"
                        ),
                        item.eta
                      )} Uhr`,
                },
              },

              price: {
                initial: {
                  label: "Angebotspreis",
                  price: `€${item.base_price}`,
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
