import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PutRidesThirdErrorResponseInterface,
  PutRidesThirdPayloadRequestInterface,
  PutRidesThirdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPutRidesThird } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";

export const usePutRidesThird = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PutRidesThirdSuccessResponseInterface,
    PutRidesThirdErrorResponseInterface
  >({
    mutationKey: PlanRideTripReactQueryKey.PutRidesThird(),
    mutationFn: () => {
      const payload: PutRidesThirdPayloadRequestInterface = {
        path: {
          id: 1,
        },
        body: {
          maxtwo_backseat: false,
          base_price: 120,
        },
      };
      return fetchPutRidesThird(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_POST_RIDE_THIRD",
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
