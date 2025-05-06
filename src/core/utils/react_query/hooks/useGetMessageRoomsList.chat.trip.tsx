import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";
import Cookies from "universal-cookie";
import { fetchGetMessageRoomsUnreadList } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsUnreadListErrorResponseInterface,
  GetMessageRoomsUnreadListPayloadRequestInterface,
  GetMessageRoomsUnreadListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";

export const useGetMessageRoomsUnreadList = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const payload: GetMessageRoomsUnreadListPayloadRequestInterface = {
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
      sort: "-last_message_at",
    },
  };
  const query = useQuery<
    GetMessageRoomsUnreadListSuccessResponseInterface,
    GetMessageRoomsUnreadListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsUnreadList(payload),
    queryFn: () => {
      return fetchGetMessageRoomsUnreadList(payload);
    },
    enabled: !!token,
    refetchInterval: 15000,
  });

  return query;
};
