import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import {
  PostRidesFirstErrorResponseInterface,
  PostRidesFirstPayloadRequestInterface,
  PostRidesFirstSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { fetchPostRidesFirst } from "@/core/services/rest/simplyhop/rides";
import { PlanRideTripContext } from "../../context";
import { PlanRideTripReactQueryKey } from "../keys";

export const usePostRidesFirst = () => {
  const { state } = React.useContext(PlanRideTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostRidesFirstSuccessResponseInterface,
    PostRidesFirstErrorResponseInterface
  >({
    mutationKey: PlanRideTripReactQueryKey.PostRidesFirst(),
    mutationFn: () => {
      const payload: PostRidesFirstPayloadRequestInterface = {
        body: {
          vehicle_id: 8,
          start_lat: 52.52,
          start_long: 13.404954,
          destination_lat: 48.1351253,
          destination_long: 11.5819804,
          departure_time: "2025-03-31 09:30:00",
        },
      };
      return fetchPostRidesFirst(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_POST_RIDE_FIRST",
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
