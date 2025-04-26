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
    queryKey: MyListTripReactQueryKey.GetRidesId(),
    queryFn: () => {
      return fetchGetRidesId(payload);
    },
    enabled: !type,
  });

  // React.useEffect(() => {
  //   if (!!query.data && !query.isFetching) {
  //     const data = query.data;

  //     //
  //   }
  // }, [query.data, query.isFetching]);
  return query;
};
