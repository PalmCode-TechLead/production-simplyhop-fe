import {
  GetRidesIdPathPayloadRequestInterface,
  PutRidesSecondPathPayloadRequestInterface,
  PutRidesThirdPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";

export const SimplyHopAPICollectionURL = {
  auth: {
    postLogin: () => `/api/auth/login`,
    postRegister: () => `/api/auth/register`,
  },
  vehicle: {
    postCreate: () => `/api/vehicle`,
    getMy: () => `/api/vehicle`,
  },
  user_profile: {
    postCreate: () => `/api/vehicle`,
  },
  vehicle_brand: {
    getList: () => `/api/vehicle-brand`,
  },
  vehicle_category: {
    getList: () => `/api/vehicle-category`,
  },
  rides: {
    getSearch: () => `/api/rides/search`,
    getId: (path: GetRidesIdPathPayloadRequestInterface) =>
      `/api/rides/${path.id}`,
    getMy: () => `/api/rides/my`,
    postFirst: () => `/api/rides/first`,
    putSecond: (path: PutRidesSecondPathPayloadRequestInterface) =>
      `/api/rides/second/${path.id}`,
    putThird: (path: PutRidesThirdPathPayloadRequestInterface) =>
      `/api/rides/third/${path.id}`,
  },
  booking: {
    postBook: () => `/api/bookings/book`,
  },
};
