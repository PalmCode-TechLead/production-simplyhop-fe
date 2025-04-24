import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostBookingRejectErrorResponseInterface,
  PostBookingRejectPayloadRequestInterface,
  PostBookingRejectSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { fetchPostBookingReject } from "@/core/services/rest/simplyhop/booking";
import { ChatTripReactQueryKey } from "../keys";
import { useSearchParams } from "next/navigation";

export const usePostBookingReject = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const mutation = useMutation<
    PostBookingRejectSuccessResponseInterface,
    PostBookingRejectErrorResponseInterface
  >({
    mutationKey: ChatTripReactQueryKey.PostBookingReject(),
    mutationFn: () => {
      const payload: PostBookingRejectPayloadRequestInterface = {
        path: {
          id: !bookingId ? "0" : String(bookingId),
        },
      };
      return fetchPostBookingReject(payload);
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
