// import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

// import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetBookingId } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingIdErrorResponseInterface,
  GetBookingIdPayloadRequestInterface,
  GetBookingIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
// import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
// import dayjs from "dayjs";
// import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetBookingId = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  // const { state, dispatch } = React.useContext(MyListTripContext);
  const id = searchParams.get("booking_id");
  console.log("ini kepanggil ga");
  const payload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !id ? "0" : String(id),
    },
    params: {
      include: "ride.vehicle.brand,rideTime,user",
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
    enabled: type === "book" && !!id,
  });

  // React.useEffect(() => {
  //   if (!!query.data && !query.isFetching) {
  //     const data = query.data;
  //   }
  // }, [query.data, query.isFetching]);
  return query;
};
