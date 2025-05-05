import { GetMessageRoomsUnreadListPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";

export const ChatTripReactQueryKey = {
  GetMessageRoomsUnreadList: (
    payload?: GetMessageRoomsUnreadListPayloadRequestInterface
  ) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsUnreadList", [payload] as const];
  },
};
