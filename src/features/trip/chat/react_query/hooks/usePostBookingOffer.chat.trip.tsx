import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingOfferErrorResponseInterface,
  PostBookingOfferPayloadRequestInterface,
  PostBookingOfferSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingOffer } from "@/core/services/rest/simplyhop/booking";
import { ChatTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";

export const usePostBookingOffer = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const mutation = useMutation<
    PostBookingOfferSuccessResponseInterface,
    PostBookingOfferErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostBookingOffer(),
    mutationFn: () => {
      const payload: PostBookingOfferPayloadRequestInterface = {
        path: {
          id: !bookingId ? "0" : String(bookingId),
        },
        body: {
          offered_price: 100,
        },
      };
      return fetchPostBookingOffer(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_POST_RIDE_SECOND",
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
