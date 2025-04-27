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
import { ChatTripContext } from "../../context";

export const usePostBookingOffer = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const { state } = React.useContext(ChatTripContext);

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
          message: !state.offer.form.notes.value.length
            ? undefined
            : state.offer.form.notes.value,
          offered_price: Number(state.offer.price?.price ?? "0"),
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
