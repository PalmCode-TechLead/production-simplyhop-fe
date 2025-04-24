import { GetMessageRoomsListPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";

export const ChatTripReactQueryKey = {
  GetMessagesListByRoom: () => {
    return ["ChatTripReactQueryKey.GetMessagesList"];
  },
  GetMessageRoomsList: (
    payload?: GetMessageRoomsListPayloadRequestInterface
  ) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsList", [payload] as const];
  },
  PutMessageRoomsMarkAsRead: () => {
    return ["ChatTripReactQueryKey.PutMessageRoomsMarkAsRead"];
  },
  PostMessagesChat: () => {
    return ["ChatTripReactQueryKey.PostMessagesChat"];
  },
};
