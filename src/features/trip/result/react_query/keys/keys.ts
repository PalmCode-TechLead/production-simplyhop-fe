export const ResultTripReactQueryKey = {
  GetRidesSearch: (payload?: {
    url?: string;
    "filter[luggage_allowed]"?: boolean;
    music_availability?: boolean;
    smoke_allowed?: boolean;
    pet_allowed?: boolean;
    include?: string;
    //mandatory
    sort?: string;
    "page[number]"?: number;
    "page[size]"?: number;
  }) => {
    return ["ResultTripReactQueryKey.GetRideSearch", [payload] as const];
  },
  GetRidesId: () => {
    return ["ResultTripReactQueryKey.GetRideSearch"];
  },
  PostBookingBook: () => {
    return ["ResultTripReactQueryKey.PostRideFirst"];
  },
};
