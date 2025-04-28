import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import { GetRidesIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const ArchiveTripReactQueryKey = {
  GetRidesMy: () => {
    return ["ArchiveTripReactQueryKey.GetRidesMy"];
  },
  GetBookingMy: () => {
    return ["ArchiveTripReactQueryKey.GetBookingMy"];
  },
  GetRidesId: (payload?: GetRidesIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetRidesId", [payload] as const];
  },
  GetBookingId: (payload?: GetBookingIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetBookingId", [payload] as const];
  },
};
