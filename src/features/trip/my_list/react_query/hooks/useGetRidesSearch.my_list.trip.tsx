import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchPayloadRequestInterface,
  GetRidesSearchSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const useGetRidesSearch = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(MyListTripContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      include: "vehicle.brand,user,bookings,bookings.user",
      departure_time__gte: dayjs()
        .add(1, "day")
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss"),
      sort: "departure_time",
      "page[number]": state.ride.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetRidesSearch(payload),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
    enabled: !type && !!userState.profile?.id && userState.profile.is_driver,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("ride_id", String(item.id));
        return {
          id: String(item.id),
          driver: {
            profile: {
              avatar: !item.user.avatar
                ? undefined
                : {
                    src: item.user.avatar,
                    alt: "photo_profile",
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
              name: !item.vehicle.brand?.title
                ? item.vehicle.model ?? ""
                : !item.vehicle.model
                ? item.vehicle.brand?.title ?? ""
                : `${item.vehicle.brand?.title} ${item.vehicle.model}`,
              number: item.vehicle.plate_license,
            },
          },

          routes: {
            date: {
              label: "Datum",
              date: !item.departure_time
                ? "-"
                : dayjs(item.departure_time).format("DD.MM.YY"),
            },
            startTime: {
              label: "Startzeit",
              time: !item.departure_time
                ? "-"
                : dayjs(item.departure_time).format("HH.mm [Uhr]"),
            },
            departure: {
              place: !item.start_name ? "-" : item.start_name,
              time: !item.departure_time
                ? "-"
                : dayjs(item.departure_time).format("HH.mm [Uhr]"),
            },
            travelTime: {
              time: !item.eta ? "-" : setDurationTime(item.eta),
            },
            arrival: {
              place: !item.destination_name ? "-" : item.destination_name,
              time: !item.eta
                ? "-"
                : `${setArrivalTime(
                    dayjs(item.departure_time).format("HH:mm"),
                    item.eta
                  )} Uhr`,
            },
          },

          price: {
            initial: {
              label: "Angebotspreis",
              price: item.base_price === null ? "-" : `€${item.base_price}`,
            },
          },
          cta: {
            detail: {
              children: "Siehe Details",
              href: AppCollectionURL.private.myList(urlSearchParams.toString()),
            },
          },
          // detail: {
          //   booking: item.bookings.map((bookingItem, index) => {
          //     return {
          //       booking: {
          //         number: String(index + 1),
          //         name: `${bookingItem.user?.first_name} ${bookingItem.user?.last_name}`,
          //       },
          //       route: {
          //         origin: !item.start_name ? "-" : item.start_name,
          //         destination: !item.destination_name
          //           ? "-"
          //           : item.destination_name,
          //       },
          //       // passenger: {
          //       //   adult: (
          //       //     bookingItem.seats - bookingItem.child_seats
          //       //   ).toLocaleString("de-DE"),
          //       //   children: bookingItem.child_seats.toLocaleString("de-DE"),
          //       // },
          //       price: {
          //         value: bookingItem.total_amount.toLocaleString("de-DE"),
          //       },
          //     };
          //   }),
          //   price: {
          //     label: "Angebotspreis",
          //     price: `€${item.base_price.toLocaleString("de-DE")}`,
          //   },
          // },
        };
      });
      dispatch({
        type: MyListTripActionEnum.SetRideDataData,
        payload:
          state.ride.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.ride.data
            : [...state.ride.data, ...newPayload],
      });
      dispatch({
        type: MyListTripActionEnum.SetRideDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
