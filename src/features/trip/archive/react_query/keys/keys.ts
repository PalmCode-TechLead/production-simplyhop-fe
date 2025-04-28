import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import { GetRidesIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const ArchiveTripReactQueryKey = {
  GetRidesSearch: () => {
    return ["ArchiveTripReactQueryKey.GetRidesSearch"];
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
