import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArchiveTripReactQueryKey } from "../keys";

import { ArchiveTripActionEnum, ArchiveTripContext } from "../../context";

import { fetchGetBookingMy } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingMyErrorResponseInterface,
  GetBookingMyPayloadRequestInterface,
  GetBookingMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";

export const useGetBookingMy = () => {
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(ArchiveTripContext);

  const payload: GetBookingMyPayloadRequestInterface = {
    params: {
      include: "ride.vehicle.brand,user",
      "filter[ride.departure_time__lte]": dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    },
  };
  const query = useQuery<
    GetBookingMySuccessResponseInterface,
    GetBookingMyErrorResponseInterface
  >({
    queryKey: ArchiveTripReactQueryKey.GetBookingMy(),
    queryFn: () => {
      return fetchGetBookingMy(payload);
    },
    enabled:
      type === "book" || (userState.profile?.is_driver === false && !type),
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: ArchiveTripActionEnum.SetBookData,
        payload: {
          ...state.book,
          data: data.data.map((item) => {
            const urlSearchParams = new URLSearchParams(
              searchParams.toString()
            );
            urlSearchParams.append("booking_id", String(item.id));
            return {
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
                  date: dayjs(item.ride_time?.departure_time).format(
                    "DD.MM.YY"
                  ),
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
                  href: AppCollectionURL.private.myListArchive(
                    urlSearchParams.toString()
                  ),
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
