import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingBookErrorResponseInterface,
  PostBookingBookPayloadRequestInterface,
  PostBookingBookSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingBook } from "@/core/services/rest/simplyhop/booking";
import { ResultTripContext } from "../../context";
import { ResultTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";

export const usePostBookingBook = () => {
  const { state } = React.useContext(ResultTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const searchParams = useSearchParams();
  const rideId = searchParams.get(RIDE_FILTER.RIDE_ID);
  const mutation = useMutation<
    PostBookingBookSuccessResponseInterface,
    PostBookingBookErrorResponseInterface
  >({
    mutationKey: ResultTripReactQueryKey.PostBookingBook(),
    mutationFn: () => {
      const payload: PostBookingBookPayloadRequestInterface = {
        body: {
          ride_id: Number(String(rideId ?? "0")),
          seats: 2,
          ride_time_id: Number(String(rideId ?? "0")),
          offered_price: 120,
          message: "",
        },
      };
      return fetchPostBookingBook(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_POST_BOOKING_BOOK",
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
