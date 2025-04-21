import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const ResultTripReactQueryKey = {
  GetRideSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["ResultTripReactQueryKey.GetRideSearch", [payload] as const];
  },
  PostBookingBook: () => {
    return ["ResultTripReactQueryKey.PostRideFirst"];
  },
};
