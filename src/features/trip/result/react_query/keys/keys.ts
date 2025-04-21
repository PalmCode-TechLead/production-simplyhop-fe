import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const ResultTripReactQueryKey = {
  RestSimplyHopGetRideSearch: (
    payload?: GetRidesSearchPayloadRequestInterface
  ) => {
    return [
      "ResultTripReactQueryKey.RestSimplyHopGetRideSearch",
      [payload] as const,
    ];
  },
};
