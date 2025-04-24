import {
  GetAuthSocialCallbackPathPayloadRequestInterface,
  GetAuthSocialRedirectPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  PostBookingAcceptPathPayloadRequestInterface,
  PostBookingOfferPathPayloadRequestInterface,
  PostBookingRejectPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/booking";
import { GetMessageRoomsIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import { PutMessageRoomsMarkAsReadPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms/mark_as_read.put";
import {
  DeleteMessagesChatPathPayloadRequestInterface,
  GetMessagesListByRoomPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/messages";
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
    postLogout: () => `/api/auth/logout`,
    getSocialRedirect: (
      path: GetAuthSocialRedirectPathPayloadRequestInterface
    ) => `/api/auth/${path.provider}/redirect`,
    getSocialCallback: (
      path: GetAuthSocialCallbackPathPayloadRequestInterface
    ) => `/api/auth/${path.provider}/callback`,
    deleteDeactivateAccount: () => `/api/auth/deactivate-account`,
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
    postAccept: (path: PostBookingAcceptPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/accept`,
    postOffer: (path: PostBookingOfferPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/counter-offer`,
    postReject: (path: PostBookingRejectPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/reject`,
  },
  messages: {
    getListByRoom: (path: GetMessagesListByRoomPathPayloadRequestInterface) =>
      `/api/messages/room/${path.roomId}`,
    postChat: () => `/api/messages/send-text`,
    deleteChat: (path: DeleteMessagesChatPathPayloadRequestInterface) =>
      `/api/messages/${path.id}`,
  },
  message_rooms: {
    getList: () => `/api/message-rooms`,
    getId: (path:GetMessageRoomsIdPathPayloadRequestInterface) => `/api/message-rooms/${path.id}`,
    putMarkAsRead: (
      path: PutMessageRoomsMarkAsReadPathPayloadRequestInterface
    ) => `/api/message-rooms/${path.roomId}/mark-as-read`,
  },
};
