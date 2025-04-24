import {
  GetMessageRoomsIdPayloadRequestInterface,
  GetMessageRoomsListPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/message_rooms";

export const ChatTripReactQueryKey = {
  GetMessagesListByRoom: () => {
    return ["ChatTripReactQueryKey.GetMessagesList"];
  },
  GetMessageRoomsList: (
    payload?: GetMessageRoomsListPayloadRequestInterface
  ) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsList", [payload] as const];
  },
  GetMessageRoomsId: (payload?: GetMessageRoomsIdPayloadRequestInterface) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsId", [payload] as const];
  },
  PutMessageRoomsMarkAsRead: () => {
    return ["ChatTripReactQueryKey.PutMessageRoomsMarkAsRead"];
  },
  PostMessagesChat: () => {
    return ["ChatTripReactQueryKey.PostMessagesChat"];
  },
  PostBookingAccept: () => {
    return ["ChatTripReactQueryKey.PostBookingAccept"];
  },
  PostBookingOffer: () => {
    return ["ChatTripReactQueryKey.PostBookingOffer"];
  },
  PostBookingReject: () => {
    return ["ChatTripReactQueryKey.PostBookingReject"];
  },
};
