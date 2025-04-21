import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const ResultTripReactQueryKey = {
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["ResultTripReactQueryKey.GetRideSearch", [payload] as const];
  },
  GetRidesId: () => {
    return ["ResultTripReactQueryKey.GetRideSearch"];
  },
  PostBookingBook: () => {
    return ["ResultTripReactQueryKey.PostRideFirst"];
  },
};
