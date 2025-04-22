import { PutMessageRoomsMarkAsReadPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms/mark_as_read.put";
import {
  GetRidesIdPathPayloadRequestInterface,
  PutRidesSecondPathPayloadRequestInterface,
  PutRidesThirdPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import { GetVehicleIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";

export const SimplyHopAPICollectionURL = {
  auth: {
    postLogin: () => `/api/auth/login`,
    postRegister: () => `/api/auth/register`,
  },
  vehicle: {
    postCreateMy: () => `/api/vehicle/storeMy`,
    getMy: () => `/api/vehicle`,
    getId: (path: GetVehicleIdPathPayloadRequestInterface) =>
      `/api/vehicle/${path.id}`,
  },
  user_profile: {
    postCreate: () => `/api/profile`,
    getData: () => `/api/profile`,
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
    getMy: () => `/api/bookings/my`,
  },
  messages: {
    getList: () => `/api/messages`,
  },
  message_rooms: {
    getList: () => `/api/message-rooms`,
    putMarkAsRead: (
      path: PutMessageRoomsMarkAsReadPathPayloadRequestInterface
    ) => `/api/message-rooms/${path.roomId}/mark-as-read`,
  },
};
