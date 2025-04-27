import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import { GetRidesIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const MyListTripReactQueryKey = {
  GetRidesMy: () => {
    return ["MyListTripReactQueryKey.GetRidesMy"];
  },
  GetBookingMy: () => {
    return ["MyListTripReactQueryKey.GetBookingMy"];
  },
  GetRidesId: (payload?: GetRidesIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetRidesId", [payload] as const];
  },
  GetBookingId: (payload?: GetBookingIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetBookingId", [payload] as const];
  },
};
