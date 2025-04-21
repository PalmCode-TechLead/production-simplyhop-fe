import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutRidesSecondErrorResponseInterface,
  PutRidesSecondPayloadRequestInterface,
  PutRidesSecondSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPutRidesSecond } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";

export const usePutRidesSecond = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PutRidesSecondSuccessResponseInterface,
    PutRidesSecondErrorResponseInterface
  >({
    mutationKey: PlanRideTripReactQueryKey.PutRidesSecond(),
    mutationFn: () => {
      const payload: PutRidesSecondPayloadRequestInterface = {
        path: {
          id: 1,
        },
        body: {
          recurring_ride: "no",
          waiting_time: "5 minuten",
          available_seats: 2,
          additional_info: "my information",
        },
      };
      return fetchPutRidesSecond(payload);
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
